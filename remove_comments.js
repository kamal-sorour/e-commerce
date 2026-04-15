const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function removeComments(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(
        filePath,
        fileContent,
        ts.ScriptTarget.Latest,
        true
    );

    const comments = [];

    function processTrivia(pos, end, kind) {
        comments.push({ pos, end, kind });
    }

    function visit(node) {
        const fullText = sourceFile.getFullText();
        
        const leadingComments = ts.getLeadingCommentRanges(fullText, node.pos);
        if (leadingComments) {
            comments.push(...leadingComments);
        }

        const trailingComments = ts.getTrailingCommentRanges(fullText, node.end);
        if (trailingComments) {
            comments.push(...trailingComments);
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    // Some comments are attached to the source file itself
    const endComments = ts.getTrailingCommentRanges(sourceFile.text, sourceFile.end);
    if (endComments) {
        comments.push(...endComments);
    }
    const startComments = ts.getLeadingCommentRanges(sourceFile.text, sourceFile.pos);
    if (startComments) {
        comments.push(...startComments);
    }

    // Remove duplicates
    const uniqueComments = [];
    const seen = new Set();
    for (const c of comments) {
        const key = `${c.pos}-${c.end}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueComments.push(c);
        }
    }

    // Sort backwards
    uniqueComments.sort((a, b) => b.pos - a.pos);

    let newContent = fileContent;
    let modified = false;

    // We also need to be careful with formatting or overlapping.
    for (const comment of uniqueComments) {
        const commentText = fileContent.substring(comment.pos, comment.end);
        
        // Remove the comment IF it doesn't contain 'console.log'
        // Also keep JSX comments with console.log, or remove them
        if (!commentText.includes('console.log')) {
            newContent = newContent.substring(0, comment.pos) + newContent.substring(comment.end);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Modified: ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            try {
                removeComments(fullPath);
            } catch (err) {
                console.error(`Error processing ${fullPath}`, err);
            }
        }
    }
}

const targetDir = path.join(process.cwd(), process.argv[2] || '');
walk(targetDir);

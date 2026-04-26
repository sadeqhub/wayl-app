const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('components/Text.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Look for standard react-native imports containing Text
      if (content.includes("import { Text") || content.includes("Text,") || content.includes(", Text")) {
        // If it's importing Text from react-native
        const rnImportRegex = /import\s+{[^}]*\bText\b[^}]*}\s+from\s+['"]react-native['"];?/;
        if (rnImportRegex.test(content)) {
          // Replace Text in the react-native import
          content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]react-native['"];?/, (match, p1) => {
            const parts = p1.split(',').map(s => s.trim()).filter(Boolean);
            const nonTextParts = parts.filter(p => p !== 'Text');
            if (nonTextParts.length === 0) {
              return ''; // If Text was the only import, remove it completely
            }
            return `import { ${nonTextParts.join(', ')} } from 'react-native';`;
          });
          
          // Add our custom Text import at the top of the file
          const customTextImport = `import { Text } from '@/components/Text';\n`;
          // Find the first import and insert before it
          const firstImportIndex = content.indexOf('import');
          if (firstImportIndex !== -1) {
             content = content.slice(0, firstImportIndex) + customTextImport + content.slice(firstImportIndex);
          } else {
             content = customTextImport + content;
          }
        }
      }
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, '../app'));
processDir(path.join(__dirname, '../components'));
console.log('Done replacing Text imports.');

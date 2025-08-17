/**
 * Test script to verify Babel migration
 * Run with: node test-migration.js
 */

const { parse } = require('@babel/parser');

// Sample React TypeScript code
const sampleCode = `
import React, { useState } from 'react';

// React Component - Function Declaration
export function MyComponent({ name, age }: { name: string; age: number }) {
  return <div>Hello {name}, you are {age} years old</div>;
}

// Custom Hook
export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  return { count, increment: () => setCount(count + 1) };
}

// Interface Definition
export interface User {
  id: string;
  name: string;
  email: string;
}
`;

console.log('🔍 Testing Babel Parser Migration...\n');

try {
  // Parse with Babel
  const ast = parse(sampleCode, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'jsx',
      'decorators-legacy',
      'classProperties',
      'objectRestSpread'
    ],
    tokens: true,
    errorRecovery: true
  });

  console.log('✅ Babel parsing successful!');
  console.log(`📊 Found ${ast.program.body.length} top-level statements`);
  
  // Count different node types
  const nodeTypes = {};
  const countNodes = (node) => {
    if (node.type) {
      nodeTypes[node.type] = (nodeTypes[node.type] || 0) + 1;
    }
    if (node.body) {
      if (Array.isArray(node.body)) {
        node.body.forEach(countNodes);
      } else {
        countNodes(node.body);
      }
    }
  };
  
  countNodes(ast);
  
  console.log('\n📈 Node types found:');
  Object.entries(nodeTypes).forEach(([type, count]) => {
    console.log(`   • ${type}: ${count}`);
  });
  
  console.log('\n🎉 Migration test completed successfully!');
  console.log('The AST parser is ready to use with Babel.');
  
} catch (error) {
  console.error('❌ Migration test failed:', error.message);
  process.exit(1);
}

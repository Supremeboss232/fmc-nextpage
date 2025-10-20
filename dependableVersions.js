// dependableVersions.js

// Example version list (replace this with yours)
const versions = [
  '0.0.0-insiders.bc1af02',
  '0.0.0-insiders.bc3d38b',
  '0.0.0-insiders.bc3d38b', // duplicate for testing
  '0.0.0-insiders.bcf14b1',
  'invalid.version',
  '0.0.0-insiders.bf8f39a'
];

// Pattern for valid insider builds
const validPattern = /^0\.0\.0-insiders\.[a-f0-9]{6,8}$/i;

// Filter valid + remove duplicates
const dependable = [...new Set(versions.filter(v => validPattern.test(v)))];

console.log("✅ Dependable versions found:");
dependable.forEach(v => console.log(' -', v));

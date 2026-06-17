const fs = require('fs');
const files = [
  'src/App.jsx',
  'src/components/AddDonorModal.jsx',
  'src/components/DonorCard.jsx',
  'src/components/Footer.jsx',
  'src/components/Hero.jsx',
  'src/components/Navbar.jsx',
  'src/context/AuthContext.jsx',
  'src/main.jsx',
  'src/pages/About.jsx',
  'src/pages/Admin.jsx',
  'src/pages/Donors.jsx',
  'src/pages/Events.jsx',
  'src/pages/Gallery.jsx',
  'src/pages/Home.jsx'
];
for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.startsWith("import React from 'react'\n") || content.startsWith("import React from 'react'\r\n")) {
    content = content.replace(/^import React from 'react'\r?\n/, '');
    fs.writeFileSync(file, content);
  }
}
console.log('Fixed imports');

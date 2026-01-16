'use client';

import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Mail',
      icon: Mail,
      href: 'mailto:auhonabasu03@gmail.com',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/auhonab',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/auhona-basu',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/auhona_03',
    }
  ];

  return (
    <footer 
      className="bg-muted" 
      style={{ paddingTop: '32px', paddingBottom: '32px' }}
    >
      {/* Container */}
      <div 
        className="mx-auto" 
        style={{ 
          paddingLeft: '40px', 
          paddingRight: '40px',
          maxWidth: '100%',
          width: '100%'
        }}
      >
        <div 
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{ gap: '24px' }} // Gap between copyright and social icons (responsive)
        >
          
          {/* Copyright - Left */}
          <div className="text-muted-foreground">
            <p style={{ fontSize: '0.875rem', margin: 0 }}>
              &copy; {currentYear} Auhona Portfolio. 
            </p>
          </div>

          {/* Social Links - Right */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                // Inline style for gap between icons
                style={{ 
                    marginLeft: index === 0 ? '0px' : '10px',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40px',  // Simulating size="icon"
                    height: '40px', // Simulating size="icon"
                    borderRadius: '6px',
                    transition: 'background-color 0.2s'
                }}
                // Simulating variant="ghost" using utility classes for hover states
                className="text-muted-foreground hover:bg-gray-200/10 hover:text-primary"
              >
                <social.icon size={20} />
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
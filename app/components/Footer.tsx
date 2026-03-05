'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
          className="flex items-center justify-center"
        >
          
          {/* Copyright - Center */}
          <div className="text-muted-foreground">
            <p style={{ fontSize: '0.875rem', margin: 0 }}>
              &copy; {currentYear} Auhona Portfolio. 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react'

const LocationSection = () => {
  return (
    <div className="flex-1 w-full h-[60%]   relative overflow-hidden">
        {/* If using Google Maps iframe, uncomment this and remove the image */}
        {/* <iframe
          src="https://www.google.com/maps/embed?... your URL ..."
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}

        <a href="https://maps.app.goo.gl/cWRBwXFomTUYaeYs9" target="_blank" rel="noopener noreferrer">
        <img src="/assets/contact-image.png" className="w-full h-full object-cover" alt="map" />
        </a>

        
      </div>
  )
}

export default LocationSection

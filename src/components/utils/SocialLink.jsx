import React from 'react'

const SocialLink = ({ icon }) => {

  const ClickLinks=[
    {link:"https://www.facebook.com/nike/"},
    {link:"https://www.facebook.com/nike/"},
    {link:"https://www.instagram.com/nike/?hl=en"},
    {link:"https://twitter.com/Nike?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"},
    {link:"https://www.youtube.com/@nike"}
  ]
  const extractedLinks = ClickLinks.map(clickObj => clickObj.link).join('\n');
  return (
   <><a href="https://www.facebook.com/nike/">
      <img
        src={icon}
        alt="icon/social"
        className="w-8 h-8 flex items-center cursor-pointer md:w-6 md:h-6 sm:w-5 sm:h-5 transition-all duration-200 hover:scale-110"
      />
      </a>
   </>
  )
}

export default SocialLink
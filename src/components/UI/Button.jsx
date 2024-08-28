import React from 'react'

export const Button = ({children,textOnly, ...props}) => {
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' + cssClasses;
  return (
    <button  {...props} className={cssClasses}>{children}</button>
  )
}

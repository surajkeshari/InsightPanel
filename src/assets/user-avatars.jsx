import React from 'react';

const nameToColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 50%, 70%)`;
  return color;
};

export const UserAvatar = ({ name }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const bgColor = nameToColor(name || '');

  return (
    <div
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1rem',
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );
};
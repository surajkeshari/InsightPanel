import React from 'react';
import { FiX } from 'react-icons/fi';
import { notifications, activities, contactsData } from '../../data/demoData';
import { UserAvatar } from '../../assets/user-avatars.jsx';

const RightSidebar = ({ isRightSidebarOpen, setRightSidebarOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden ${isRightSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setRightSidebarOpen(false)}
      ></div>

      {/* Main Sidebar */}
      <aside className={`w-72 bg-card border-l border-border p-6 flex-shrink-0 overflow-y-auto fixed lg:relative top-0 right-0 h-full z-40 transition-transform transform ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}>
        <div className="flex justify-end lg:hidden mb-4">
          <button onClick={() => setRightSidebarOpen(false)} className="text-muted">
            <FiX size={24} />
          </button>
        </div>
        <Section title="Notifications">
          {notifications.map(item => <ListItem key={item.id} item={item} />)}
        </Section>
        
        <Section title="Activities">
          {activities.map(item => <ListItem key={item.id} item={item} />)}
        </Section>

        <Section title="Contacts">
          {contactsData.map(contact => (
            <li key={contact.id} className="flex items-center">
              <UserAvatar name={contact.name} />
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground leading-snug">{contact.name}</p>
              </div>
            </li>
          ))}
        </Section>
      </aside>
    </>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-base font-semibold mb-4 text-foreground">{title}</h3>
    <ul className="space-y-4">{children}</ul>
  </div>
);

const ListItem = ({ item }) => (
  <li className="flex items-start">
    <UserAvatar name={item.user} />
    <div className="ml-3">
      <p className="text-sm text-muted leading-snug">{item.text}</p>
      <span className="text-xs text-muted/70">{item.time}</span>
    </div>
  </li>
);

export default RightSidebar;
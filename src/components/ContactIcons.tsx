// Importing necessary components and utilities from Mantine and Tabler Icons
import { Text, Box, Stack, rem } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';
import classes from './css/ContactIcons.module.css'; // Importing CSS module for styling

// Define the props interface for the ContactIcon component
interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun; // The icon type is one of the Tabler icons
  title: React.ReactNode; // The title for the contact icon
  description: React.ReactNode; // The description for the contact icon
}

// Functional component to display a contact icon with title and description
function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
  return (
    // Wrapper div with custom styling
    <div className={classes.wrapper} {...others}>
      {/* Box component to provide margin-right and contain the icon */}
      <Box mr="md">
        {/* Render the icon with specified width and height */}
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        {/* Display title with small text size and custom styling */}
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        {/* Display description with custom styling */}
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

// Mock data to simulate contact details
const MOCKDATA = [
  { title: 'Email', description: 'harshsinha0000#gmail.com', icon: IconAt },
  { title: 'Phone', description: '+91 93340 *****', icon: IconPhone },
  { title: 'Address', description: '844 Morris Park avenue', icon: IconMapPin },
  { title: 'Working hours', description: '8 a.m. – 11 p.m.', icon: IconSun },
];

// Functional component to display a list of contact icons
export function ContactIconsList() {
  // Map over the MOCKDATA array to create ContactIcon components
  const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
  
  // Return a Stack component that contains all ContactIcon components
  return <Stack>{items}</Stack>;
}

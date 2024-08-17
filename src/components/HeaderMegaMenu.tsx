"use client"

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
} from '@tabler/icons-react';
import classes from './css/HeaderMegaMenu.module.css';
import { useEffect, useState } from 'react';
import { FaBitcoin } from "react-icons/fa";

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function HeaderMegaMenu() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const theme = useMantineTheme();

  const toggleDrawer = () => setDrawerOpened((o) => !o);
  const closeDrawer = () => setDrawerOpened(false);


  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box pb={120}>
      <header className={`${classes.header} ${!headerVisible ? classes.headerhidden : ''}`}>
        <Group justify="space-between" h="100%">
          <FaBitcoin size={50} style={{ width: '60px', marginLeft: '10px', color: 'yellow' }} />
          <Group h="70%" gap={10} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="/watchlist" className={classes.link}>
              WatchList
            </a>
            <a href="/contact-us" className={classes.link}>
              Contact Us
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button>
              <a href="/login">
                Login
              </a>
            </Button>
            <Button styles={{ root: { color: 'pink' } }} variant="gradient" gradient={{ from: 'purple', to: 'blue', deg: 60 }}>
              <a href="/signup">
                Connect Wallet
              </a>
            </Button>
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        c={'blue'}
        zIndex={1000000}
      >
        <ScrollArea
          h={`calc(100vh - ${rem(80)})`}
          mx="-md"
          style={{
            background: 'linear-gradient(90deg, #1a2525, #5d89b5)',
          }}
        >
          <Divider my="md" />

          <a href="/" className={classes.link}>
            Home
          </a>
          <a href="/watchlist" className={classes.link}>
            WatchList
          </a>
          <a href="/contact-us" className={classes.link}>
            Contact Us
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button>
              <a href="/login">
                Login
              </a>
            </Button>
            <Button variant="gradient" gradient={{ from: 'purple', to: 'blue', deg: 60 }}>
              <a href="/signup">
                Connect Wallet
              </a>
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

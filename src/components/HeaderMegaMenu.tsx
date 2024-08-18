"use client";

import { useContext } from "react";
import { LoginContext } from "@/context/login.context";

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from "@mantine/core";
import classes from "./css/HeaderMegaMenu.module.css";
import { useEffect, useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import Link from "next/link";
import SendToken from "./SendToken";

export function HeaderMegaMenu() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("SignUp must be used within a LoginContextProvider");
  }

  const { user, setUser } = context;

  useEffect(() => {
    // Retrieve and parse user data from localStorage
    const userData = localStorage.getItem("userkadata");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        // Do something with parsedUserData
        console.log(parsedUserData);
        setUser(parsedUserData);
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }
  }, []);


  const [drawerOpened, setDrawerOpened] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);


  const toggleDrawer = () => setDrawerOpened((o) => !o);
  const closeDrawer = () => setDrawerOpened(false);

  useEffect(() => {
    console.log(user);
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box pb={120}>
      <header
        className={`${classes.header} ${!headerVisible ? classes.headerhidden : ""
          }`}
      >
        <Group justify="space-between" h="100%">
          <FaBitcoin
            size={50}
            style={{ width: "60px", marginLeft: "10px", color: "yellow" }}
          />
          <Group h="70%" gap={10} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            {user.firstName === "" ? null : <Link href={'/watchlist'} className={classes.link}>WatchList</Link>}
            <Link href="/contact-us" className={classes.link}>
              Contact Us
            </Link>
          </Group>
          {user.firstName === "" ? <LoginSign /> : <ConnectWalletBig />}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        c={"blue"}
        zIndex={1000000}
      >
        <ScrollArea
          h={`calc(100vh - ${rem(80)})`}
          mx="-md"
          style={{
            background: "linear-gradient(90deg, #1a2525, #5d89b5)",
          }}
        >
          <Divider my="md" />

          <Link href="/" className={classes.link}>
            Home
          </Link>
          <Link href="/watchlist" className={classes.link}>
            WatchList
          </Link>
          <Link href="/contact-us" className={classes.link}>
            Contact Us
          </Link>

          <Divider my="sm" />
          {user.firstName === "" ? <Logins /> : <ConnectWalletSmall />}
        </ScrollArea>
      </Drawer>
    </Box>
  );

  function Logins() {

    return (
      <Group justify="center" grow pb="xl" px="md">
        <Button>
          <Link href="/login">Login</Link>
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "purple", to: "blue", deg: 60 }}
        >
          <Link href="/signup">Signup</Link>
        </Button>
      </Group>
    );
  }
}

function ConnectWalletSmall() {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("SignUp must be used within a LoginContextProvider");
  }

  const { user, setUser } = context;
  function log() {
    localStorage.clear();
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      id: "",
    });
  }

  return (
    <Group justify="center" grow pb="xl" px="md">
      <SendToken/>
      <Button onClick={log}>
        <Link href="/">Logout</Link>
      </Button>
    </Group>
  );
}

function ConnectWalletBig() {

  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("SignUp must be used within a LoginContextProvider");
  }

  const { user, setUser } = context;
  function log() {
    localStorage.clear()
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      id: "",
    });
  }


  return (
    <Group visibleFrom="sm">
      <SendToken/>
      <Button onClick={log}>
        <Link href="/">Logout</Link>
      </Button>
    </Group>
  );
}

function LoginSign() {
  function locale() {
    console.log(localStorage);
  }
  return (
    <Group visibleFrom="sm">
      <Button onClick={locale}>
        <Link href="/login">Login</Link>
      </Button>
      <Button
        styles={{ root: { color: "pink" } }}
        variant="gradient"
        gradient={{ from: "purple", to: "blue", deg: 60 }}
      >
        <Link href="/signup">Signup</Link>
      </Button>
    </Group>
  );
}

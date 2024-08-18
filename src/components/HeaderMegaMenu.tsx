"use client";

import { FormEvent, useContext } from "react";
import { LoginContext } from "@/context/login.context";
import { ethers } from 'ethers'

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  SimpleGrid,
  Anchor,
  HoverCard,
  Center,
  Text,
  TextInput,
  NumberInput,
} from "@mantine/core";
import classes from "./css/HeaderMegaMenu.module.css";
import { useEffect, useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import Link from "next/link";

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
            <Link href="/watchlist" className={classes.link}>
              WatchList
            </Link>
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
      <HoverCard width={400} position="bottom" radius="md" shadow="md" withinPortal zIndex={1000001}>
        <HoverCard.Target>
          <Button>
            Send Token
          </Button>
        </HoverCard.Target>

        <HoverCard.Dropdown style={{ overflow: 'hidden', background: 'white' }}>
          <Group justify="space-between" px="md">
            <Text fw={500}>Send Money</Text>
          </Group>

          <Divider my="sm" />

          <div style={{ padding: '0 16px' }}>
            <form>
              <Group>
                <TextInput
                  width={500}
                  label="Account ID"
                  placeholder="Enter account ID"
                  required
                />
                <NumberInput
                  label="Amount to Send"
                  placeholder="Enter amount"
                  min={0}
                  required
                />
                <Button type="submit" variant="filled">Send</Button>
              </Group>
            </form>
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
      <Button
        variant="gradient"
        gradient={{ from: "purple", to: "blue", deg: 60 }}
      >
        <Link href="#">Connect Wallet</Link>
      </Button>
      <Button onClick={log}>
        <Link href="/">Logout</Link>
      </Button>
    </Group>
  );
}

function ConnectWalletBig() {

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        localStorage.setItem("walletid", accounts[0])
      } catch (error) {
        console.log(error)
      }
    }
    else {
      console.log("Metamask not installed");
    }
  }

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

  const sendtoken = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    console.log(provider, await signer);
    const balance = await provider.getBalance("ethers.eth");
    console.log(balance);

    let tx = (await signer).sendTransaction({
      to: (document.getElementById("accId") as HTMLInputElement).value,
      value: ethers.parseEther((document.getElementById("amtId") as HTMLInputElement).value),
      gasPrice: "5000000",
    });

    console.log(tx);
  }


  return (
    <Group visibleFrom="sm">
      <HoverCard width={400} position="bottom" radius="md" shadow="md" withinPortal>
        <HoverCard.Target>
          <Button>
            Send Token
          </Button>
        </HoverCard.Target>

        <HoverCard.Dropdown style={{ overflow: 'hidden', background: 'white' }}>
          <Group justify="space-between" px="md">
            <Text fw={500}>Send Money</Text>
          </Group>

          <Divider my="sm" />

          <div style={{ padding: '0 16px' }}>
            <form onSubmit={sendtoken}>
              <Group>
                <TextInput
                  width={500}
                  label="Account ID"
                  id="accId"
                  placeholder="Enter account ID"
                  required
                />
                <NumberInput
                  label="Amount to Send"
                  id="amtId"
                  placeholder="Enter amount"
                  min={0}
                  required
                />
                <Button type="submit" variant="filled">Send</Button>
              </Group>
            </form>
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
      <Button
        onClick={connectWallet}
        styles={{ root: { color: "pink" } }}
        variant="gradient"
        gradient={{ from: "purple", to: "blue", deg: 60 }}
      >
        Connect Wallet
      </Button>
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

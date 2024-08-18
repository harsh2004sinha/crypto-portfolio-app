import { Button, Divider, Group, HoverCard, NumberInput, Text, TextInput } from "@mantine/core";
import { ethers } from "ethers";
import { FormEvent } from "react";


function SendToken() {
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
        <>
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
      </>
    )
}

export default SendToken
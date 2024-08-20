import { useState, useEffect } from 'react';
import { Avatar, Table, Group, Text, ActionIcon, Menu, rem } from '@mantine/core';
import { IconPencil, IconDots, IconTrash } from '@tabler/icons-react';
import resData from '@/app/market/cryptoList';
import { url } from 'inspector';

// Define the type for symbol-to-image mapping with an index signature
interface SymbolToImageMap {
  [key: string]: string;
}

// Mapping of symbols to image URLs
const symbolToImage: SymbolToImageMap = {
  "BTC": "https://www.cryptocompare.com/media/37746251/btc.png?width=25",
  "ETH": "https://www.cryptocompare.com/media/37746238/eth.png?width=25",
  "SOL": "https://www.cryptocompare.com/media/37747734/sol.png?width=25",
  "USDC": "https://www.cryptocompare.com/media/34835941/usdc.png?width=25",
  "XRP": "https://www.cryptocompare.com/media/38553096/xrp.png?width=25",
  "USDT": "https://www.cryptocompare.com/media/37746338/usdt.png?width=25",
  "PEPE": "https://www.cryptocompare.com/media/44082118/pepe.png?width=25",
  "BNB": "https://www.cryptocompare.com/media/40485170/bnb.png?width=25",
  "FDUSD": "https://www.cryptocompare.com/media/44154091/fdusd.png?width=25",
  "DOGE": "https://www.cryptocompare.com/media/37746339/doge.png?width=25",
  "TRX": "https://www.cryptocompare.com/media/37746879/trx.png?width=25",
  "WIF": "https://www.cryptocompare.com/media/44154324/wif.png?width=25",
  "AAVE": "https://www.cryptocompare.com/media/37747534/aave.png?width=25",
  "SUI": "https://www.cryptocompare.com/media/44082045/sui.png?width=25",
  "RARE": "https://www.cryptocompare.com/media/38554190/rare.png?width=25",
  "FLOKI": "https://www.cryptocompare.com/media/38553226/floki.png?width=25",
  "SYS": "https://www.cryptocompare.com/media/39456587/sys.png?width=25",
  "FET": "https://www.cryptocompare.com/media/45576550/asi.png?width=25",
  "NOT": "https://www.cryptocompare.com/media/44613958/not.png?width=25"
};

const symbolToName: SymbolToImageMap = {
    "BTC": "Bitcoin",
    "ETH": "Ethereum",
    "SOL": "Solana",
    "USDC": "USD Coin",
    "XRP": "XRP",
    "USDT": "Tether",
    "PEPE": "Pepe",
    "BNB": "Binance Coin",
    "FDUSD": "First Digital USD",
    "DOGE": "Doge Coin",
    "TRX": "TRON",
    "WIF": "dogwifhat",
    "AAVE": "Aave",
    "SUI": "Sui",
    "RARE": "Super Rare",
    "FLOKI": "Floki Inu",
    "SYS": "Syscoin",
    "FET": "Fetch.AI",
    "NOT": "NotCoin"
  };

// Fallback image URL
const fallbackImage = "https://via.placeholder.com/40"; // Placeholder image URL

export function UsersStack() {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: { USD: number } }>({});

  useEffect(() => {
    async function fetchData() {
      const data = await resData();
      setCryptoData(data);
    }
    fetchData();
  }, []);

  const rows = Object.entries(cryptoData).map(([symbol, { USD }]) => {
    const trimmedSymbol = symbol.trim();
    const imageUrl = symbolToImage[trimmedSymbol]
    const imageName = symbolToName[trimmedSymbol]

    // Debugging log
    console.log(`Symbol: ${trimmedSymbol}, Image URL: ${imageUrl}`);

    return (
      <Table.Tr key={symbol}>
        <Table.Td>
          <Group gap="sm">
            <Avatar
              size={40}
              src={imageUrl}
              radius={40}
              alt={trimmedSymbol}
              style={{ border: imageUrl === fallbackImage ? '2px solid red' : 'none' }} // Indicate missing image
            />
            <div>
              <Text fz="sm" fw={500}>
                {trimmedSymbol}
              </Text>
              <Text c="dimmed" fz="xs">
                {imageName}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">${USD.toFixed(2)}</Text>
          <Text fz="xs" c="dimmed">
            Price
          </Text>
        </Table.Td>
        <Table.Td>
          <Group gap={0} justify="flex-end">
            <Menu
              transitionProps={{ transition: 'pop' }}
              withArrow
              position="bottom-end"
              withinPortal
            >
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDots style={{ width: rem(16), height: rem(16), color: 'black' }} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  Add to Watchlist
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1723987513101-a1e2f775350b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginTop: '-80px',
        alignContent: 'center',
    }}>
        <div className='pl-96 pr-96 p-10'>
            <Table.ScrollContainer minWidth={100}>
            <Table verticalSpacing="md">
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            </Table.ScrollContainer>
        </div>
    </div>
  );
}

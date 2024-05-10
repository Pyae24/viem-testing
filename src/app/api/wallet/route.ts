import { NextRequest, NextResponse } from "next/server";
import {
  createPublicClient,
  createWalletClient,
  formatEther,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygon, polygonAmoy } from "viem/chains";

export async function GET(request: NextRequest) {
  try {
    const privateKey = process.env.USER_PRIVATE_KEY;
    const account = privateKeyToAccount(`0x${privateKey}`);
    const walletClient = createWalletClient({
      account,
      chain: polygonAmoy,
      transport: http(),
    });

    // To check balance
    const publicClient = createPublicClient({
      chain: polygonAmoy,
      transport: http(),
    });

    const balanceInWei = await publicClient.getBalance({
      address: account.address,
    });

    // Format into MATIC
    const balanceInMatic = formatEther(balanceInWei);

    return NextResponse.json({
      address: account.address,
      balance: balanceInMatic,
    });
  } catch (error) {
    console.log("Error connecting to wallet", error);
    return NextResponse.json(
      { error: "Failed to connect to wallet" },
      { status: 500 }
    );
  }
}

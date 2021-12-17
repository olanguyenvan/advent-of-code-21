import { packet } from "./types.ts";

export function getSum(packet: packet): number {
    if ("subPackets" in packet) {
        const subPacketsSum = packet.subPackets.reduce(
            (acc, subPacket) => acc + getSum(subPacket),
            0
        );

        return packet.version + subPacketsSum;
    }
    return packet.version;
}

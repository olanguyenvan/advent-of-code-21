import { packet, Type } from "./types.ts";

export function getVersionSums(packet: packet): number {
    if ("subPackets" in packet) {
        const subPacketsSum = packet.subPackets.reduce(
            (acc, subPacket) => acc + getVersionSums(subPacket),
            0
        );

        return packet.version + subPacketsSum;
    }
    return packet.version;
}

export function getPacketsCalculated(packet: packet): number {
    if ("literalValue" in packet) {
        return packet.literalValue;
    }

    const subPacketsResults = packet.subPackets.map((subPacket) =>
        getPacketsCalculated(subPacket)
    );

    switch (packet.type) {
        case Type.Sum:
            return subPacketsResults.reduce(
                (acc, subPacketResult) => acc + subPacketResult,
                0
            );
        case Type.Product:
            return subPacketsResults.reduce(
                (acc, subPacketResult) => acc * subPacketResult,
                1
            );
        case Type.Minimum:
            return Math.min(...subPacketsResults);
        case Type.Maximum:
            return Math.max(...subPacketsResults);
        case Type.GreaterThan: {
            const [subPacketAResult, subPacketBResult] = subPacketsResults;

            return subPacketAResult > subPacketBResult ? 1 : 0;
        }
        case Type.LessThan: {
            const [subPacketAResult, subPacketBResult] = subPacketsResults;

            return subPacketAResult < subPacketBResult ? 1 : 0;
        }
        case Type.EqualTo: {
            const [subPacketAResult, subPacketBResult] = subPacketsResults;

            return subPacketAResult === subPacketBResult ? 1 : 0;
        }
        default:
            return -1;
    }
}

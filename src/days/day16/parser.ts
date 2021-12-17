import { packet, literalPacket, operatorPacket } from "./types.ts";
import {
    LITERAL_PACKET_TYPE_ID,
    LENGTH_TYPE_ID_SUB_PACKETS_COUNT,
    LITERAL_VALUE_LAST_GROUP_PREFIX,
} from "./constants.ts";

export function parsePacket(rawInputHexadecimal: string) {
    let binInputParts: string[] = [];
    for (let i = 0; i < rawInputHexadecimal.length; i++) {
        binInputParts.push(
            parseInt(rawInputHexadecimal[i], 16).toString(2).padStart(4, "0")
        );
    }

    const binInput = binInputParts.join("");
    let cursor = 0;

    const packet = parsePacketRec();

    return packet;

    function parseBinaryAndMoveCursor(length: number): number {
        const parsed = parseInt(binInput.slice(cursor, cursor + length), 2);

        cursor += length;

        return parsed;
    }

    function parseLiteralValue(): number {
        const binParts: string[] = [];

        while (true) {
            const prefix = parseBinaryAndMoveCursor(1);
            binParts.push(binInput.slice(cursor, cursor + 4));
            parseBinaryAndMoveCursor(4);

            if (prefix === LITERAL_VALUE_LAST_GROUP_PREFIX) {
                break;
            }
        }

        return parseInt(binParts.join(""), 2);
    }

    function parseSubPackets(): packet[] {
        const subPackets: packet[] = [];
        const lengthTypeId = parseBinaryAndMoveCursor(1);

        if (lengthTypeId === LENGTH_TYPE_ID_SUB_PACKETS_COUNT) {
            const subPacketsCount = parseBinaryAndMoveCursor(11);

            for (let i = 0; i < subPacketsCount; i++) {
                const subPacket = parsePacketRec();

                subPackets.push(subPacket);
            }

            return subPackets;
        }

        const subPacketsLength = parseBinaryAndMoveCursor(15);

        const end = cursor + subPacketsLength;

        while (cursor < end) {
            const subPacket = parsePacketRec();

            subPackets.push(subPacket);
        }

        return subPackets;
    }

    function parsePacketRec(): packet {
        const version = parseBinaryAndMoveCursor(3);
        const packetTypeId = parseBinaryAndMoveCursor(3);
        const basicPacket = {
            version,
            packetTypeId,
        };

        if (packetTypeId === LITERAL_PACKET_TYPE_ID) {
            const literalValue = parseLiteralValue();

            const literalPacket: literalPacket = {
                ...basicPacket,
                literalValue,
            };

            return literalPacket;
        }

        const subPackets = parseSubPackets();

        const operatorPacket = {
            ...basicPacket,
            subPackets,
        };

        return operatorPacket;
    }
}

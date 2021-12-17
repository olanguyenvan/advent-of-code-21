type basicPacket = {
    version: number;
    packetTypeId: number;
};

export type operatorPacket = basicPacket & {
    subPackets: packet[];
};

export type literalPacket = basicPacket & {
    literalValue: number;
};

export type packet = operatorPacket | literalPacket;

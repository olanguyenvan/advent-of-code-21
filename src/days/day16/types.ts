export enum Type {
    Sum,
    Product,
    Minimum,
    Maximum,
    Literal,
    GreaterThan,
    LessThan,
    EqualTo,
}

type basicPacket = {
    version: number;
    type: Type;
};

export type operatorPacket = basicPacket & {
    subPackets: packet[];
};

export type literalPacket = basicPacket & {
    literalValue: number;
};

export type packet = operatorPacket | literalPacket;

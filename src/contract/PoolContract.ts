import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type UserPoolData = {
    $$type: 'UserPoolData';
    score: bigint;
    lastClaim: bigint;
    totalClaimed: bigint;
}

export function storeUserPoolData(src: UserPoolData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.score, 64);
        b_0.storeUint(src.lastClaim, 64);
        b_0.storeCoins(src.totalClaimed);
    };
}

export function loadUserPoolData(slice: Slice) {
    const sc_0 = slice;
    const _score = sc_0.loadUintBig(64);
    const _lastClaim = sc_0.loadUintBig(64);
    const _totalClaimed = sc_0.loadCoins();
    return { $$type: 'UserPoolData' as const, score: _score, lastClaim: _lastClaim, totalClaimed: _totalClaimed };
}

export function loadTupleUserPoolData(source: TupleReader) {
    const _score = source.readBigNumber();
    const _lastClaim = source.readBigNumber();
    const _totalClaimed = source.readBigNumber();
    return { $$type: 'UserPoolData' as const, score: _score, lastClaim: _lastClaim, totalClaimed: _totalClaimed };
}

export function loadGetterTupleUserPoolData(source: TupleReader) {
    const _score = source.readBigNumber();
    const _lastClaim = source.readBigNumber();
    const _totalClaimed = source.readBigNumber();
    return { $$type: 'UserPoolData' as const, score: _score, lastClaim: _lastClaim, totalClaimed: _totalClaimed };
}

export function storeTupleUserPoolData(source: UserPoolData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.score);
    builder.writeNumber(source.lastClaim);
    builder.writeNumber(source.totalClaimed);
    return builder.build();
}

export function dictValueParserUserPoolData(): DictionaryValue<UserPoolData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUserPoolData(src)).endCell());
        },
        parse: (src) => {
            return loadUserPoolData(src.loadRef().beginParse());
        }
    }
}

export type SetMainContract = {
    $$type: 'SetMainContract';
    mainContract: Address;
}

export function storeSetMainContract(src: SetMainContract) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(79, 32);
        b_0.storeAddress(src.mainContract);
    };
}

export function loadSetMainContract(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 79) { throw Error('Invalid prefix'); }
    const _mainContract = sc_0.loadAddress();
    return { $$type: 'SetMainContract' as const, mainContract: _mainContract };
}

export function loadTupleSetMainContract(source: TupleReader) {
    const _mainContract = source.readAddress();
    return { $$type: 'SetMainContract' as const, mainContract: _mainContract };
}

export function loadGetterTupleSetMainContract(source: TupleReader) {
    const _mainContract = source.readAddress();
    return { $$type: 'SetMainContract' as const, mainContract: _mainContract };
}

export function storeTupleSetMainContract(source: SetMainContract) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.mainContract);
    return builder.build();
}

export function dictValueParserSetMainContract(): DictionaryValue<SetMainContract> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetMainContract(src)).endCell());
        },
        parse: (src) => {
            return loadSetMainContract(src.loadRef().beginParse());
        }
    }
}

export type PoolDeposit = {
    $$type: 'PoolDeposit';
    user: Address;
    score: bigint;
}

export function storePoolDeposit(src: PoolDeposit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(80, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.score, 64);
    };
}

export function loadPoolDeposit(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 80) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _score = sc_0.loadUintBig(64);
    return { $$type: 'PoolDeposit' as const, user: _user, score: _score };
}

export function loadTuplePoolDeposit(source: TupleReader) {
    const _user = source.readAddress();
    const _score = source.readBigNumber();
    return { $$type: 'PoolDeposit' as const, user: _user, score: _score };
}

export function loadGetterTuplePoolDeposit(source: TupleReader) {
    const _user = source.readAddress();
    const _score = source.readBigNumber();
    return { $$type: 'PoolDeposit' as const, user: _user, score: _score };
}

export function storeTuplePoolDeposit(source: PoolDeposit) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.score);
    return builder.build();
}

export function dictValueParserPoolDeposit(): DictionaryValue<PoolDeposit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadPoolDeposit(src.loadRef().beginParse());
        }
    }
}

export type ClaimPool = {
    $$type: 'ClaimPool';
}

export function storeClaimPool(src: ClaimPool) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(81, 32);
    };
}

export function loadClaimPool(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 81) { throw Error('Invalid prefix'); }
    return { $$type: 'ClaimPool' as const };
}

export function loadTupleClaimPool(source: TupleReader) {
    return { $$type: 'ClaimPool' as const };
}

export function loadGetterTupleClaimPool(source: TupleReader) {
    return { $$type: 'ClaimPool' as const };
}

export function storeTupleClaimPool(source: ClaimPool) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserClaimPool(): DictionaryValue<ClaimPool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimPool(src)).endCell());
        },
        parse: (src) => {
            return loadClaimPool(src.loadRef().beginParse());
        }
    }
}

export type EvtPoolDeposit = {
    $$type: 'EvtPoolDeposit';
    user: Address;
    amount: bigint;
    score: bigint;
}

export function storeEvtPoolDeposit(src: EvtPoolDeposit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(96, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.score, 64);
    };
}

export function loadEvtPoolDeposit(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 96) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    const _score = sc_0.loadUintBig(64);
    return { $$type: 'EvtPoolDeposit' as const, user: _user, amount: _amount, score: _score };
}

export function loadTupleEvtPoolDeposit(source: TupleReader) {
    const _user = source.readAddress();
    const _amount = source.readBigNumber();
    const _score = source.readBigNumber();
    return { $$type: 'EvtPoolDeposit' as const, user: _user, amount: _amount, score: _score };
}

export function loadGetterTupleEvtPoolDeposit(source: TupleReader) {
    const _user = source.readAddress();
    const _amount = source.readBigNumber();
    const _score = source.readBigNumber();
    return { $$type: 'EvtPoolDeposit' as const, user: _user, amount: _amount, score: _score };
}

export function storeTupleEvtPoolDeposit(source: EvtPoolDeposit) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.score);
    return builder.build();
}

export function dictValueParserEvtPoolDeposit(): DictionaryValue<EvtPoolDeposit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEvtPoolDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadEvtPoolDeposit(src.loadRef().beginParse());
        }
    }
}

export type EvtPoolClaim = {
    $$type: 'EvtPoolClaim';
    user: Address;
    amount: bigint;
    share: bigint;
}

export function storeEvtPoolClaim(src: EvtPoolClaim) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(97, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.share, 64);
    };
}

export function loadEvtPoolClaim(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 97) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    const _share = sc_0.loadUintBig(64);
    return { $$type: 'EvtPoolClaim' as const, user: _user, amount: _amount, share: _share };
}

export function loadTupleEvtPoolClaim(source: TupleReader) {
    const _user = source.readAddress();
    const _amount = source.readBigNumber();
    const _share = source.readBigNumber();
    return { $$type: 'EvtPoolClaim' as const, user: _user, amount: _amount, share: _share };
}

export function loadGetterTupleEvtPoolClaim(source: TupleReader) {
    const _user = source.readAddress();
    const _amount = source.readBigNumber();
    const _share = source.readBigNumber();
    return { $$type: 'EvtPoolClaim' as const, user: _user, amount: _amount, share: _share };
}

export function storeTupleEvtPoolClaim(source: EvtPoolClaim) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.share);
    return builder.build();
}

export function dictValueParserEvtPoolClaim(): DictionaryValue<EvtPoolClaim> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEvtPoolClaim(src)).endCell());
        },
        parse: (src) => {
            return loadEvtPoolClaim(src.loadRef().beginParse());
        }
    }
}

export type TonGridPool$Data = {
    $$type: 'TonGridPool$Data';
    mainContract: Address;
    owner: Address;
    mainContractSet: boolean;
    users: Dictionary<Address, UserPoolData>;
    totalScore: bigint;
    poolBalance: bigint;
}

export function storeTonGridPool$Data(src: TonGridPool$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.mainContract);
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.mainContractSet);
        b_0.storeDict(src.users, Dictionary.Keys.Address(), dictValueParserUserPoolData());
        b_0.storeUint(src.totalScore, 64);
        b_0.storeCoins(src.poolBalance);
    };
}

export function loadTonGridPool$Data(slice: Slice) {
    const sc_0 = slice;
    const _mainContract = sc_0.loadAddress();
    const _owner = sc_0.loadAddress();
    const _mainContractSet = sc_0.loadBit();
    const _users = Dictionary.load(Dictionary.Keys.Address(), dictValueParserUserPoolData(), sc_0);
    const _totalScore = sc_0.loadUintBig(64);
    const _poolBalance = sc_0.loadCoins();
    return { $$type: 'TonGridPool$Data' as const, mainContract: _mainContract, owner: _owner, mainContractSet: _mainContractSet, users: _users, totalScore: _totalScore, poolBalance: _poolBalance };
}

export function loadTupleTonGridPool$Data(source: TupleReader) {
    const _mainContract = source.readAddress();
    const _owner = source.readAddress();
    const _mainContractSet = source.readBoolean();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserUserPoolData(), source.readCellOpt());
    const _totalScore = source.readBigNumber();
    const _poolBalance = source.readBigNumber();
    return { $$type: 'TonGridPool$Data' as const, mainContract: _mainContract, owner: _owner, mainContractSet: _mainContractSet, users: _users, totalScore: _totalScore, poolBalance: _poolBalance };
}

export function loadGetterTupleTonGridPool$Data(source: TupleReader) {
    const _mainContract = source.readAddress();
    const _owner = source.readAddress();
    const _mainContractSet = source.readBoolean();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserUserPoolData(), source.readCellOpt());
    const _totalScore = source.readBigNumber();
    const _poolBalance = source.readBigNumber();
    return { $$type: 'TonGridPool$Data' as const, mainContract: _mainContract, owner: _owner, mainContractSet: _mainContractSet, users: _users, totalScore: _totalScore, poolBalance: _poolBalance };
}

export function storeTupleTonGridPool$Data(source: TonGridPool$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.mainContract);
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.mainContractSet);
    builder.writeCell(source.users.size > 0 ? beginCell().storeDictDirect(source.users, Dictionary.Keys.Address(), dictValueParserUserPoolData()).endCell() : null);
    builder.writeNumber(source.totalScore);
    builder.writeNumber(source.poolBalance);
    return builder.build();
}

export function dictValueParserTonGridPool$Data(): DictionaryValue<TonGridPool$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTonGridPool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTonGridPool$Data(src.loadRef().beginParse());
        }
    }
}

 type TonGridPool_init_args = {
    $$type: 'TonGridPool_init_args';
    owner: Address;
}

function initTonGridPool_init_args(src: TonGridPool_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function TonGridPool_init(owner: Address) {
    const __code = Cell.fromHex('b5ee9c72410222010007ae000228ff008e88f4a413f4bcf2c80bed5320e303ed43d90118020271020a020120030501d9b92caed44d0d200018e10fa40fa40d200f404d33ffa0055506c168e33fa400101d16d8d0860000000000000000000000000000000000000000000000000000000000000000004707020103510341023e25505db3c6c61206e92306d99206ef2d0806f236f03e2206e92306dde804004481010b240259f40b6fa192306ddf206e92306d9dd0d33fd33ffa0055206c136f03e202039b08060801a7be2ed44d0d200018e10fa40fa40d200f404d33ffa0055506c168e33fa400101d16d8d0860000000000000000000000000000000000000000000000000000000000000000004707020103510341023e2db3c6c6180700022001abbdfed44d0d200018e10fa40fa40d200f404d33ffa0055506c168e33fa400101d16d8d0860000000000000000000000000000000000000000000000000000000000000000004707020103510341023e25505db3c6c61809008081010b240259f40b6fa192306ddf206e92306d9dd0d33fd33ffa0055206c136f03e2206e923070e022923070e121923070e1206ef2d0806f235b5210a822a9040201200b1002037ae00c0e01aba601da89a1a400031c21f481f481a401e809a67ff400aaa0d82d1c67f4800203a2db1a10c0000000000000000000000000000000000000000000000000000000000000000008e0e040206a20682047c4aa0bb678d8c30d006281010b240259f40b6fa192306ddf206e92306d9dd0d33fd33ffa0055206c136f03e2206e923070e0206ef2d0806f236c2101a7a675da89a1a400031c21f481f481a401e809a67ff400aaa0d82d1c67f4800203a2db1a10c0000000000000000000000000000000000000000000000000000000000000000008e0e040206a20682047c5b678d8c30f000225020120111301adb5673da89a1a400031c21f481f481a401e809a67ff400aaa0d82d1c67f4800203a2db1a10c0000000000000000000000000000000000000000000000000000000000000000008e0e040206a20682047c4aa0bb678d8c3012008c81010b240259f40b6fa192306ddf206e92306d9dd0d33fd33ffa0055206c136f03e2206e96308208093a80e0206ef2d0806f2330318208093a80a0f82321be923070e0f823a1020120141601adb3bfbb513434800063843e903e9034803d0134cffe8015541b05a38cfe900040745b6342180000000000000000000000000000000000000000000000000000000000000000011c1c08040d440d0408f8954176cf1b186015007881010b240259f40b6fa192306ddf206e92306d9dd0d33fd33ffa0055206c136f03e2206e923070e022923070e1206ef2d0806f235b812710a822a90401a9b3607b513434800063843e903e9034803d0134cffe8015541b05a38cfe900040745b6342180000000000000000000000000000000000000000000000000000000000000000011c1c08040d440d0408f8b6cf1b18601700022103f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e10fa40fa40d200f404d33ffa0055506c168e33fa400101d16d8d0860000000000000000000000000000000000000000000000000000000000000000004707020103510341023e207925f07e005d70d1ff2e08221c04fe30221c050e302191a1d006c313403fa4030815e0df84224c705f2f4820098e602b312f2f450347f5520c87f01ca0055505056ce13ceca00f400cb3f01fa02c9ed5402fc31fa40d33f3081226ef84227c705f2f4f8416f24135f03820afaf080a18200849221c200f2f45188a02381010b2459f40b6fa192306ddf206e92306d9dd0d33fd33ffa0055206c136f03e2206eb38e2c3081010bf823523070c855205023cb3fcb3f01fa02c924103601206e953059f45930944133f413e25171a007e30d1b1c0076206ef2d0806f23532abb9350a2a193323970e2545301a081010b50b3c855205023cb3fcb3f01fa02c924103601206e953059f45930944133f413e200905088c8552080605004cb1f12ce01fa02cb3fc9c88258c000000000000000000000000101cb67ccc970fb001035443012c87f01ca0055505056ce13ceca00f400cb3f01fa02c9ed5401d021c051e302018210946a98b6ba8e53d33f30c8018210aff90f5758cb1fcb3fc910461035443012f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca0055505056ce13ceca00f400cb3f01fa02c9ed54e05f07f2c0821e01fc5bf8422181010b2259f40b6fa192306ddf206e92306d9dd0d33fd33ffa0055206c136f03e2813469216eb3f2f4206ef2d0806f23018208093a80a0816be5f82358bef2f48200e18d28c200f2f481429429c200f2f48133ae22c200f2f45381a828a90481491d21820afaf080bef2f48200e26c531abbf2f422812710a8291f02fea904f8235132a01481010b5044c855205023cb3fcb3f01fa02c945505240206e953059f45930944133f413e25183a1546243c8552080615004cb1f12ce01fa02cb3fc9c88258c000000000000000000000000101cb67ccc970fb0002820afaf080a171885a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e012021000000706eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001035443012c87f01ca0055505056ce13ceca00f400cb3f01fa02c9ed54e1c6abde');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initTonGridPool_init_args({ $$type: 'TonGridPool_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const TonGridPool_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    8814: { message: "Unauthorized: only MainContract" },
    13230: { message: "Your score is zero — activate levels to earn score" },
    13417: { message: "No pool record for this address" },
    17044: { message: "Pool balance is empty" },
    18717: { message: "Share too small to claim" },
    24077: { message: "Unauthorized: only owner can update mainContract address" },
    27621: { message: "Claim not ready — wait 7 days between claims" },
    33938: { message: "Deposit too small to cover gas" },
    39142: { message: "MainContract can only be set once" },
    57741: { message: "No score data in pool" },
    57964: { message: "Insufficient pool balance" },
} as const

export const TonGridPool_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Unauthorized: only MainContract": 8814,
    "Your score is zero — activate levels to earn score": 13230,
    "No pool record for this address": 13417,
    "Pool balance is empty": 17044,
    "Share too small to claim": 18717,
    "Unauthorized: only owner can update mainContract address": 24077,
    "Claim not ready — wait 7 days between claims": 27621,
    "Deposit too small to cover gas": 33938,
    "MainContract can only be set once": 39142,
    "No score data in pool": 57741,
    "Insufficient pool balance": 57964,
} as const

const TonGridPool_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UserPoolData","header":null,"fields":[{"name":"score","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"lastClaim","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"totalClaimed","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetMainContract","header":79,"fields":[{"name":"mainContract","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PoolDeposit","header":80,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"score","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ClaimPool","header":81,"fields":[]},
    {"name":"EvtPoolDeposit","header":96,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"score","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"EvtPoolClaim","header":97,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"share","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TonGridPool$Data","header":null,"fields":[{"name":"mainContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"mainContractSet","type":{"kind":"simple","type":"bool","optional":false}},{"name":"users","type":{"kind":"dict","key":"address","value":"UserPoolData","valueFormat":"ref"}},{"name":"totalScore","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"poolBalance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const TonGridPool_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "SetMainContract": 79,
    "PoolDeposit": 80,
    "ClaimPool": 81,
    "EvtPoolDeposit": 96,
    "EvtPoolClaim": 97,
}

const TonGridPool_getters: ABIGetter[] = [
    {"name":"getPoolBalance","methodId":94306,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getTotalScore","methodId":130433,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getUserPoolData","methodId":70346,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"UserPoolData","optional":true}},
    {"name":"getUserShare","methodId":94431,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getTimeUntilClaim","methodId":117561,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getUserSharePercent","methodId":126718,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getTotalClaimed","methodId":109824,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getMainContract","methodId":110394,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const TonGridPool_getterMapping: { [key: string]: string } = {
    'getPoolBalance': 'getGetPoolBalance',
    'getTotalScore': 'getGetTotalScore',
    'getUserPoolData': 'getGetUserPoolData',
    'getUserShare': 'getGetUserShare',
    'getTimeUntilClaim': 'getGetTimeUntilClaim',
    'getUserSharePercent': 'getGetUserSharePercent',
    'getTotalClaimed': 'getGetTotalClaimed',
    'getMainContract': 'getGetMainContract',
}

const TonGridPool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetMainContract"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PoolDeposit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimPool"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export const CLAIM_INTERVAL = 604800n;
export const MIN_CLAIM = 50000000n;
export const GAS_RESERVE = 50000000n;

export class TonGridPool implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = TonGridPool_errors_backward;
    public static readonly opcodes = TonGridPool_opcodes;
    
    static async init(owner: Address) {
        return await TonGridPool_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const __gen_init = await TonGridPool_init(owner);
        const address = contractAddress(0, __gen_init);
        return new TonGridPool(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new TonGridPool(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TonGridPool_types,
        getters: TonGridPool_getters,
        receivers: TonGridPool_receivers,
        errors: TonGridPool_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetMainContract | PoolDeposit | ClaimPool | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetMainContract') {
            body = beginCell().store(storeSetMainContract(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PoolDeposit') {
            body = beginCell().store(storePoolDeposit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimPool') {
            body = beginCell().store(storeClaimPool(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetPoolBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getPoolBalance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetTotalScore(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getTotalScore', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetUserPoolData(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getUserPoolData', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleUserPoolData(result_p) : null;
        return result;
    }
    
    async getGetUserShare(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getUserShare', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetTimeUntilClaim(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getTimeUntilClaim', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetUserSharePercent(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getUserSharePercent', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetTotalClaimed(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getTotalClaimed', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetMainContract(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getMainContract', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}
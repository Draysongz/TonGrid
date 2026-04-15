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

export type UserData = {
    $$type: 'UserData';
    referrer: Address;
    regTime: bigint;
    directRefs: bigint;
    rank: bigint;
    x3ActiveLevels: bigint;
    x6ActiveLevels: bigint;
    score: bigint;
}

export function storeUserData(src: UserData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.referrer);
        b_0.storeUint(src.regTime, 64);
        b_0.storeUint(src.directRefs, 32);
        b_0.storeUint(src.rank, 8);
        b_0.storeUint(src.x3ActiveLevels, 16);
        b_0.storeUint(src.x6ActiveLevels, 16);
        b_0.storeUint(src.score, 64);
    };
}

export function loadUserData(slice: Slice) {
    const sc_0 = slice;
    const _referrer = sc_0.loadAddress();
    const _regTime = sc_0.loadUintBig(64);
    const _directRefs = sc_0.loadUintBig(32);
    const _rank = sc_0.loadUintBig(8);
    const _x3ActiveLevels = sc_0.loadUintBig(16);
    const _x6ActiveLevels = sc_0.loadUintBig(16);
    const _score = sc_0.loadUintBig(64);
    return { $$type: 'UserData' as const, referrer: _referrer, regTime: _regTime, directRefs: _directRefs, rank: _rank, x3ActiveLevels: _x3ActiveLevels, x6ActiveLevels: _x6ActiveLevels, score: _score };
}

export function loadTupleUserData(source: TupleReader) {
    const _referrer = source.readAddress();
    const _regTime = source.readBigNumber();
    const _directRefs = source.readBigNumber();
    const _rank = source.readBigNumber();
    const _x3ActiveLevels = source.readBigNumber();
    const _x6ActiveLevels = source.readBigNumber();
    const _score = source.readBigNumber();
    return { $$type: 'UserData' as const, referrer: _referrer, regTime: _regTime, directRefs: _directRefs, rank: _rank, x3ActiveLevels: _x3ActiveLevels, x6ActiveLevels: _x6ActiveLevels, score: _score };
}

export function loadGetterTupleUserData(source: TupleReader) {
    const _referrer = source.readAddress();
    const _regTime = source.readBigNumber();
    const _directRefs = source.readBigNumber();
    const _rank = source.readBigNumber();
    const _x3ActiveLevels = source.readBigNumber();
    const _x6ActiveLevels = source.readBigNumber();
    const _score = source.readBigNumber();
    return { $$type: 'UserData' as const, referrer: _referrer, regTime: _regTime, directRefs: _directRefs, rank: _rank, x3ActiveLevels: _x3ActiveLevels, x6ActiveLevels: _x6ActiveLevels, score: _score };
}

export function storeTupleUserData(source: UserData) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.referrer);
    builder.writeNumber(source.regTime);
    builder.writeNumber(source.directRefs);
    builder.writeNumber(source.rank);
    builder.writeNumber(source.x3ActiveLevels);
    builder.writeNumber(source.x6ActiveLevels);
    builder.writeNumber(source.score);
    return builder.build();
}

export function dictValueParserUserData(): DictionaryValue<UserData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUserData(src)).endCell());
        },
        parse: (src) => {
            return loadUserData(src.loadRef().beginParse());
        }
    }
}

export type X3State = {
    $$type: 'X3State';
    slots: bigint;
    cycles: bigint;
}

export function storeX3State(src: X3State) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.slots, 8);
        b_0.storeUint(src.cycles, 32);
    };
}

export function loadX3State(slice: Slice) {
    const sc_0 = slice;
    const _slots = sc_0.loadUintBig(8);
    const _cycles = sc_0.loadUintBig(32);
    return { $$type: 'X3State' as const, slots: _slots, cycles: _cycles };
}

export function loadTupleX3State(source: TupleReader) {
    const _slots = source.readBigNumber();
    const _cycles = source.readBigNumber();
    return { $$type: 'X3State' as const, slots: _slots, cycles: _cycles };
}

export function loadGetterTupleX3State(source: TupleReader) {
    const _slots = source.readBigNumber();
    const _cycles = source.readBigNumber();
    return { $$type: 'X3State' as const, slots: _slots, cycles: _cycles };
}

export function storeTupleX3State(source: X3State) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.slots);
    builder.writeNumber(source.cycles);
    return builder.build();
}

export function dictValueParserX3State(): DictionaryValue<X3State> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeX3State(src)).endCell());
        },
        parse: (src) => {
            return loadX3State(src.loadRef().beginParse());
        }
    }
}

export type X6State = {
    $$type: 'X6State';
    row1: bigint;
    row2: bigint;
    cycles: bigint;
}

export function storeX6State(src: X6State) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.row1, 8);
        b_0.storeUint(src.row2, 8);
        b_0.storeUint(src.cycles, 32);
    };
}

export function loadX6State(slice: Slice) {
    const sc_0 = slice;
    const _row1 = sc_0.loadUintBig(8);
    const _row2 = sc_0.loadUintBig(8);
    const _cycles = sc_0.loadUintBig(32);
    return { $$type: 'X6State' as const, row1: _row1, row2: _row2, cycles: _cycles };
}

export function loadTupleX6State(source: TupleReader) {
    const _row1 = source.readBigNumber();
    const _row2 = source.readBigNumber();
    const _cycles = source.readBigNumber();
    return { $$type: 'X6State' as const, row1: _row1, row2: _row2, cycles: _cycles };
}

export function loadGetterTupleX6State(source: TupleReader) {
    const _row1 = source.readBigNumber();
    const _row2 = source.readBigNumber();
    const _cycles = source.readBigNumber();
    return { $$type: 'X6State' as const, row1: _row1, row2: _row2, cycles: _cycles };
}

export function storeTupleX6State(source: X6State) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.row1);
    builder.writeNumber(source.row2);
    builder.writeNumber(source.cycles);
    return builder.build();
}

export function dictValueParserX6State(): DictionaryValue<X6State> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeX6State(src)).endCell());
        },
        parse: (src) => {
            return loadX6State(src.loadRef().beginParse());
        }
    }
}

export type Register = {
    $$type: 'Register';
    referrer: Address;
}

export function storeRegister(src: Register) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(16, 32);
        b_0.storeAddress(src.referrer);
    };
}

export function loadRegister(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 16) { throw Error('Invalid prefix'); }
    const _referrer = sc_0.loadAddress();
    return { $$type: 'Register' as const, referrer: _referrer };
}

export function loadTupleRegister(source: TupleReader) {
    const _referrer = source.readAddress();
    return { $$type: 'Register' as const, referrer: _referrer };
}

export function loadGetterTupleRegister(source: TupleReader) {
    const _referrer = source.readAddress();
    return { $$type: 'Register' as const, referrer: _referrer };
}

export function storeTupleRegister(source: Register) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.referrer);
    return builder.build();
}

export function dictValueParserRegister(): DictionaryValue<Register> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRegister(src)).endCell());
        },
        parse: (src) => {
            return loadRegister(src.loadRef().beginParse());
        }
    }
}

export type ActivateLevel = {
    $$type: 'ActivateLevel';
    level: bigint;
}

export function storeActivateLevel(src: ActivateLevel) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(17, 32);
        b_0.storeUint(src.level, 8);
    };
}

export function loadActivateLevel(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 17) { throw Error('Invalid prefix'); }
    const _level = sc_0.loadUintBig(8);
    return { $$type: 'ActivateLevel' as const, level: _level };
}

export function loadTupleActivateLevel(source: TupleReader) {
    const _level = source.readBigNumber();
    return { $$type: 'ActivateLevel' as const, level: _level };
}

export function loadGetterTupleActivateLevel(source: TupleReader) {
    const _level = source.readBigNumber();
    return { $$type: 'ActivateLevel' as const, level: _level };
}

export function storeTupleActivateLevel(source: ActivateLevel) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.level);
    return builder.build();
}

export function dictValueParserActivateLevel(): DictionaryValue<ActivateLevel> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeActivateLevel(src)).endCell());
        },
        parse: (src) => {
            return loadActivateLevel(src.loadRef().beginParse());
        }
    }
}

export type EvtRegistered = {
    $$type: 'EvtRegistered';
    user: Address;
    referrer: Address;
    time: bigint;
}

export function storeEvtRegistered(src: EvtRegistered) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(48, 32);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.referrer);
        b_0.storeUint(src.time, 64);
    };
}

export function loadEvtRegistered(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 48) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _referrer = sc_0.loadAddress();
    const _time = sc_0.loadUintBig(64);
    return { $$type: 'EvtRegistered' as const, user: _user, referrer: _referrer, time: _time };
}

export function loadTupleEvtRegistered(source: TupleReader) {
    const _user = source.readAddress();
    const _referrer = source.readAddress();
    const _time = source.readBigNumber();
    return { $$type: 'EvtRegistered' as const, user: _user, referrer: _referrer, time: _time };
}

export function loadGetterTupleEvtRegistered(source: TupleReader) {
    const _user = source.readAddress();
    const _referrer = source.readAddress();
    const _time = source.readBigNumber();
    return { $$type: 'EvtRegistered' as const, user: _user, referrer: _referrer, time: _time };
}

export function storeTupleEvtRegistered(source: EvtRegistered) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeAddress(source.referrer);
    builder.writeNumber(source.time);
    return builder.build();
}

export function dictValueParserEvtRegistered(): DictionaryValue<EvtRegistered> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEvtRegistered(src)).endCell());
        },
        parse: (src) => {
            return loadEvtRegistered(src.loadRef().beginParse());
        }
    }
}

export type EvtLevelActivated = {
    $$type: 'EvtLevelActivated';
    user: Address;
    level: bigint;
}

export function storeEvtLevelActivated(src: EvtLevelActivated) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(49, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.level, 8);
    };
}

export function loadEvtLevelActivated(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 49) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _level = sc_0.loadUintBig(8);
    return { $$type: 'EvtLevelActivated' as const, user: _user, level: _level };
}

export function loadTupleEvtLevelActivated(source: TupleReader) {
    const _user = source.readAddress();
    const _level = source.readBigNumber();
    return { $$type: 'EvtLevelActivated' as const, user: _user, level: _level };
}

export function loadGetterTupleEvtLevelActivated(source: TupleReader) {
    const _user = source.readAddress();
    const _level = source.readBigNumber();
    return { $$type: 'EvtLevelActivated' as const, user: _user, level: _level };
}

export function storeTupleEvtLevelActivated(source: EvtLevelActivated) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.level);
    return builder.build();
}

export function dictValueParserEvtLevelActivated(): DictionaryValue<EvtLevelActivated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEvtLevelActivated(src)).endCell());
        },
        parse: (src) => {
            return loadEvtLevelActivated(src.loadRef().beginParse());
        }
    }
}

export type EvtRewardPaid = {
    $$type: 'EvtRewardPaid';
    to: Address;
    amount: bigint;
    level: bigint;
    matrix: bigint;
}

export function storeEvtRewardPaid(src: EvtRewardPaid) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(50, 32);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.level, 8);
        b_0.storeUint(src.matrix, 8);
    };
}

export function loadEvtRewardPaid(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 50) { throw Error('Invalid prefix'); }
    const _to = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    const _level = sc_0.loadUintBig(8);
    const _matrix = sc_0.loadUintBig(8);
    return { $$type: 'EvtRewardPaid' as const, to: _to, amount: _amount, level: _level, matrix: _matrix };
}

export function loadTupleEvtRewardPaid(source: TupleReader) {
    const _to = source.readAddress();
    const _amount = source.readBigNumber();
    const _level = source.readBigNumber();
    const _matrix = source.readBigNumber();
    return { $$type: 'EvtRewardPaid' as const, to: _to, amount: _amount, level: _level, matrix: _matrix };
}

export function loadGetterTupleEvtRewardPaid(source: TupleReader) {
    const _to = source.readAddress();
    const _amount = source.readBigNumber();
    const _level = source.readBigNumber();
    const _matrix = source.readBigNumber();
    return { $$type: 'EvtRewardPaid' as const, to: _to, amount: _amount, level: _level, matrix: _matrix };
}

export function storeTupleEvtRewardPaid(source: EvtRewardPaid) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.level);
    builder.writeNumber(source.matrix);
    return builder.build();
}

export function dictValueParserEvtRewardPaid(): DictionaryValue<EvtRewardPaid> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEvtRewardPaid(src)).endCell());
        },
        parse: (src) => {
            return loadEvtRewardPaid(src.loadRef().beginParse());
        }
    }
}

export type EvtCycle = {
    $$type: 'EvtCycle';
    user: Address;
    matrix: bigint;
    level: bigint;
    cycles: bigint;
}

export function storeEvtCycle(src: EvtCycle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(51, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.matrix, 8);
        b_0.storeUint(src.level, 8);
        b_0.storeUint(src.cycles, 32);
    };
}

export function loadEvtCycle(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 51) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _matrix = sc_0.loadUintBig(8);
    const _level = sc_0.loadUintBig(8);
    const _cycles = sc_0.loadUintBig(32);
    return { $$type: 'EvtCycle' as const, user: _user, matrix: _matrix, level: _level, cycles: _cycles };
}

export function loadTupleEvtCycle(source: TupleReader) {
    const _user = source.readAddress();
    const _matrix = source.readBigNumber();
    const _level = source.readBigNumber();
    const _cycles = source.readBigNumber();
    return { $$type: 'EvtCycle' as const, user: _user, matrix: _matrix, level: _level, cycles: _cycles };
}

export function loadGetterTupleEvtCycle(source: TupleReader) {
    const _user = source.readAddress();
    const _matrix = source.readBigNumber();
    const _level = source.readBigNumber();
    const _cycles = source.readBigNumber();
    return { $$type: 'EvtCycle' as const, user: _user, matrix: _matrix, level: _level, cycles: _cycles };
}

export function storeTupleEvtCycle(source: EvtCycle) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.matrix);
    builder.writeNumber(source.level);
    builder.writeNumber(source.cycles);
    return builder.build();
}

export function dictValueParserEvtCycle(): DictionaryValue<EvtCycle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEvtCycle(src)).endCell());
        },
        parse: (src) => {
            return loadEvtCycle(src.loadRef().beginParse());
        }
    }
}

export type EvtRankUp = {
    $$type: 'EvtRankUp';
    user: Address;
    newRank: bigint;
}

export function storeEvtRankUp(src: EvtRankUp) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(52, 32);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.newRank, 8);
    };
}

export function loadEvtRankUp(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 52) { throw Error('Invalid prefix'); }
    const _user = sc_0.loadAddress();
    const _newRank = sc_0.loadUintBig(8);
    return { $$type: 'EvtRankUp' as const, user: _user, newRank: _newRank };
}

export function loadTupleEvtRankUp(source: TupleReader) {
    const _user = source.readAddress();
    const _newRank = source.readBigNumber();
    return { $$type: 'EvtRankUp' as const, user: _user, newRank: _newRank };
}

export function loadGetterTupleEvtRankUp(source: TupleReader) {
    const _user = source.readAddress();
    const _newRank = source.readBigNumber();
    return { $$type: 'EvtRankUp' as const, user: _user, newRank: _newRank };
}

export function storeTupleEvtRankUp(source: EvtRankUp) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.newRank);
    return builder.build();
}

export function dictValueParserEvtRankUp(): DictionaryValue<EvtRankUp> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEvtRankUp(src)).endCell());
        },
        parse: (src) => {
            return loadEvtRankUp(src.loadRef().beginParse());
        }
    }
}

export type TonGridMain$Data = {
    $$type: 'TonGridMain$Data';
    owner: Address;
    poolContract: Address;
    users: Dictionary<Address, UserData>;
    x3: Dictionary<bigint, X3State>;
    x6: Dictionary<bigint, X6State>;
    totalUsers: bigint;
    totalVolume: bigint;
}

export function storeTonGridMain$Data(src: TonGridMain$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.poolContract);
        b_0.storeDict(src.users, Dictionary.Keys.Address(), dictValueParserUserData());
        b_0.storeDict(src.x3, Dictionary.Keys.BigInt(257), dictValueParserX3State());
        b_0.storeDict(src.x6, Dictionary.Keys.BigInt(257), dictValueParserX6State());
        b_0.storeUint(src.totalUsers, 32);
        b_0.storeCoins(src.totalVolume);
    };
}

export function loadTonGridMain$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _poolContract = sc_0.loadAddress();
    const _users = Dictionary.load(Dictionary.Keys.Address(), dictValueParserUserData(), sc_0);
    const _x3 = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserX3State(), sc_0);
    const _x6 = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserX6State(), sc_0);
    const _totalUsers = sc_0.loadUintBig(32);
    const _totalVolume = sc_0.loadCoins();
    return { $$type: 'TonGridMain$Data' as const, owner: _owner, poolContract: _poolContract, users: _users, x3: _x3, x6: _x6, totalUsers: _totalUsers, totalVolume: _totalVolume };
}

export function loadTupleTonGridMain$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _poolContract = source.readAddress();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserUserData(), source.readCellOpt());
    const _x3 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserX3State(), source.readCellOpt());
    const _x6 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserX6State(), source.readCellOpt());
    const _totalUsers = source.readBigNumber();
    const _totalVolume = source.readBigNumber();
    return { $$type: 'TonGridMain$Data' as const, owner: _owner, poolContract: _poolContract, users: _users, x3: _x3, x6: _x6, totalUsers: _totalUsers, totalVolume: _totalVolume };
}

export function loadGetterTupleTonGridMain$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _poolContract = source.readAddress();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserUserData(), source.readCellOpt());
    const _x3 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserX3State(), source.readCellOpt());
    const _x6 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserX6State(), source.readCellOpt());
    const _totalUsers = source.readBigNumber();
    const _totalVolume = source.readBigNumber();
    return { $$type: 'TonGridMain$Data' as const, owner: _owner, poolContract: _poolContract, users: _users, x3: _x3, x6: _x6, totalUsers: _totalUsers, totalVolume: _totalVolume };
}

export function storeTupleTonGridMain$Data(source: TonGridMain$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.poolContract);
    builder.writeCell(source.users.size > 0 ? beginCell().storeDictDirect(source.users, Dictionary.Keys.Address(), dictValueParserUserData()).endCell() : null);
    builder.writeCell(source.x3.size > 0 ? beginCell().storeDictDirect(source.x3, Dictionary.Keys.BigInt(257), dictValueParserX3State()).endCell() : null);
    builder.writeCell(source.x6.size > 0 ? beginCell().storeDictDirect(source.x6, Dictionary.Keys.BigInt(257), dictValueParserX6State()).endCell() : null);
    builder.writeNumber(source.totalUsers);
    builder.writeNumber(source.totalVolume);
    return builder.build();
}

export function dictValueParserTonGridMain$Data(): DictionaryValue<TonGridMain$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTonGridMain$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTonGridMain$Data(src.loadRef().beginParse());
        }
    }
}

 type TonGridMain_init_args = {
    $$type: 'TonGridMain_init_args';
    owner: Address;
    poolContract: Address;
}

function initTonGridMain_init_args(src: TonGridMain_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.poolContract);
    };
}

async function TonGridMain_init(owner: Address, poolContract: Address) {
    const __code = Cell.fromHex('b5ee9c7241024f01001373000228ff008e88f4a413f4bcf2c80bed5320e303ed43d90127020271020a020120030503d5ba284ed44d0d200018ed8fa40fa405902d1016d6d6d247020f8232175840e530b55408103e8060504431381010b5027c855605067ce14cb3f12cb1fcb07cb0fcb0fcb3fc929103801206e953059f45930944133f413e2719320c1108ae83037500604e30d5506db3c6c718282904007881010b260259f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e2206e92307fe0206ef2d0806f2710365f06020158060803d1b2f07b513434800063b63e903e901640b4405b5b5b491c083e08c85d610394c2d5502040fa01814110c4e04042d409f215581419f38532cfc4b2c7f2c1f2c3f2c3f2cff24a440e00481ba54c167d164c25104cfd04f89c64c8304422ba0c0dd4018138c376cf1b1c6028290700022503d5b1707b513434800063b63e903e901640b4405b5b5b491c083e08c85d610394c2d5502040fa01814110c4e04042d409f215581419f38532cfc4b2c7f2c1f2c3f2c3f2cff24a440e00481ba54c167d164c25104cfd04f89c64c8304422ba0c0dd4018138c35541b6cf1b1c60282909007481010b260259f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e2206e923070e0206ef2d0806f276c610201200b170201480c0e03d1b3a27b513434800063b63e903e901640b4405b5b5b491c083e08c85d610394c2d5502040fa01814110c4e04042d409f215581419f38532cfc4b2c7f2c1f2c3f2c3f2cff24a440e00481ba54c167d164c25104cfd04f89c64c8304422ba0c0dd4018138c376cf1b1c6028290d0002260201580f15020120101203d3a665da89a1a400031db1f481f480b205a202dadada48e041f04642eb081ca616aa810207d00c0a088627020216a04f90aac0a0cf9c29967e25963f960f961f961f967f925220700240dd2a60b3e8b261288267e827c4e32641822115d0606ea00c09c61aaa0db678d8e3282911005a81010b260259f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e26eb304d3a727da89a1a400031db1f481f480b205a202dadada48e041f04642eb081ca616aa810207d00c0a088627020216a04f90aac0a0cf9c29967e25963f960f961f961f967f925220700240dd2a60b3e8b261288267e827c4e32641822115d0606ea00c09c61aaa2db678d8e32829131401602455718101010adb3c489059f40d6fa192306ddf206e92306d9dd0d307d307d31f55206c136f03e2105710461035443043002c206e92306d99206ef2d0806f236f03e2206e92306dde03d0aa95ed44d0d200018ed8fa40fa405902d1016d6d6d247020f8232175840e530b55408103e8060504431381010b5027c855605067ce14cb3f12cb1fcb07cb0fcb0fcb3fc929103801206e953059f45930944133f413e2719320c1108ae83037500604e30ddb3c6c712829160002210201201822020120191c04d5b03afb513434800063b63e903e901640b4405b5b5b491c083e08c85d610394c2d5502040fa01814110c4e04042d409f215581419f38532cfc4b2c7f2c1f2c3f2c3f2cff24a440e00481ba54c167d164c25104cfd04f89c64c8304422ba0c0dd4018138c35541b6cf1b1c6028291a1b005681010b260259f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e2002c206e92306d99206ef2d0806f276f07e2206e92306dde0201581d2004d4a892ed44d0d200018ed8fa40fa405902d1016d6d6d247020f8232175840e530b55408103e8060504431381010b5027c855605067ce14cb3f12cb1fcb07cb0fcb0fcb3fc929103801206e953059f45930944133f413e2719320c1108ae83037500604e30d5516db3c6c7128291e1f015a2555718101010adb3c489059f40d6fa192306ddf206e92306d9ad0d307d31f596c126f02e2105710461035443043002c206e92306d99206ef2d0806f226f02e2206e92306dde03d0a87eed44d0d200018ed8fa40fa405902d1016d6d6d247020f8232175840e530b55408103e8060504431381010b5027c855605067ce14cb3f12cb1fcb07cb0fcb0fcb3fc929103801206e953059f45930944133f413e2719320c1108ae83037500604e30ddb3c6c71282921000220020158232503d5af09f6a268690000c76c7d207d202c816880b6b6b69238107c1190bac2072985aaa04081f40302822189c08085a813e42ab02833e70a659f89658fe583e587e587e59fe494881c0090374a982cfa2c984a2099fa09f138c99060884574181ba803027186aa8b6d9e3638c0282924017e81010b54471359f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e2206e925b70e0206ef2d0806f27165f0601db3c4803d5ac5976a268690000c76c7d207d202c816880b6b6b69238107c1190bac2072985aaa04081f40302822189c08085a813e42ab02833e70a659f89658fe583e587e587e59fe494881c0090374a982cfa2c984a2099fa09f138c99060884574181ba803027186aa8b6d9e3638c0282926018081010b54471359f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e2206e925b70e0206ef2d0806f2710265f0601db3c4803f63001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018ed8fa40fa405902d1016d6d6d247020f8232175840e530b55408103e8060504431381010b5027c855605067ce14cb3f12cb1fcb07cb0fcb0fcb3fc929103801206e953059f45930944133f413e2719320c1108ae83037500604e30d0828292a02c62510451048431650828101015438a9db3c347020c85902cb07cb1fc910384940206e953059f45a30944133f415e22541678101015437a9db3c33705300c855205023cb07cb07cb1fc910394890206e953059f45a30944133f415e207a410371510341243430034fa40fa40f404d401d0f404f404d31ffa00301047104610456c1703fc925f08e006d70d1ff2e08221c010e30221c011e302018210946a98b6ba8e5cd33f30c8018210aff90f5758cb1fcb3fc91057104610354430f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca0055605067ce14ce12f40001c8f40012f40012cb1f58fa02cdc9ed54e05f082b314e02fc31fa4030f842f8416f24135f0381526d2681010b2459f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e26ef2f420821077359400bef2e5d62581010b2459f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e253306e945343c705e30d2c2d00027f03f8923028def823702071207610465e321581010b541767c855605067ce14cb3f12cb1fcb07cb0fcb0fcb3fc925103a01206e953059f45930944133f413e226105a1049473016810101541cda71db3c347020c85902cb07cb1fc9103d4e40206e953059f45a30944133f415e25410a0810101541dca71db3c33705300c843432e03e255205023cb07cb07cb1fc9103e4de0206e953059f45a30944133f415e206206ef2d0806f2704a410ad109c108b107a08111008071111072f070650454330db3c5466605466605466600d11130d0c11120c0b11110b0a11100a109f108e07111307db3c105c104b103a498081010b50eec8383a2f049055605067ce14cb3f12cb1fcb07cb0fcb0fcb3fc9478052a0206e953059f45930944133f413e210565530821035a4e900821008f0d18054491ddb3c71545900db3c712cdb3c2871723d463f3002b4db3c550771500cdb3c01a408a0f8234970c8552080305004cb1f12cececb3fc9c88258c000000000000000000000000101cb67ccc970fb005523c87f01ca0055605067ce14ce12f40001c8f40012f40012cb1f58fa02cdc9ed54464202fc31d30730f842f8416f24135f03810ea123c2019323c1109170e2f2f42581010b2359f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e2812583216eb3f2f4206ef2d0806f278200e9102aa507111007106f105e104d103c021111020111120152d0db3c01111201f2f48200f2b048320460111153cadb3cb301111201f2f429db3c20aa00298200c23b02bef2f4106710561045103441300111110151cadb3c51ba4833363501f420c001923070e020c002973082103b9aca00e020c0039730821077359400e020c00497308210ee6b2800e020c00597308211dcd65000e020c00697308213b9aca000e020c007983082180773594000e020c008983082180ee6b28000e020c009983082181dcd650000e020c00a983082183b9aca0000e020c00b34007c983082187735940000e020c00c98308218ee6b280000e020c00d98308219dcd6500000e020c00e9830821bb9aca00000e0c00f988220077359400000e07004ecdb3c2455528101015439bcdb3c347020c85902cb07cb1fc910384a40206e953059f45a30944133f415e22541688101015437bcdb3c33705300c855205023cb07cb07cb1fc9103a48a0206e953059f45a30944133f415e2104d103c4ba9201069070611120605111005104f0311100302111002011111364343370006a5aeb103fadb3c5466605466605466600d11130d0c11120c0b11110b0a11100a109f108e07111307db3c81010bc82e06105e104d103c102b0111100152c0111155605067ce14cb3f12cb1fcb07cb0fcb0fcb3fc95425d0206e953059f45930944133f413e229a70a8064a90451aaa10aaa00820afaf080a110384760104510494130383a3c02e6106e105d104c103b4a982a71209320c1108e9f106910581047103948795389db3c93372807de09a410691058104710364540e8303152d0db3c530cbc8e273c517bc85980345003cb1fcecb07c9c88258c000000000000000000000000101cb67ccc970fb00923037e2105d104c103b4a9855064839008c21c2319320c20e9170e2925b75e021c21d9320c20b9170e2925b74e021c20e9320c2089170e2925b73e021c2069320c2059170e2925b72e001c20292c202923070e29171e070038230343470719320c1108f28106c105b104a1039487c53bcdb3c9307a407de53acdb3c9307a407de0ca4106c105b104a10394870e8303333aa0001a703a001db3ca848483b004420c001923072e020c002923072e020c003923073e020c004923075e0c005917ae0710424544c1adb3c537971db3c518a72db3c5438a93d46463e008e71c8805001cb1f5004cf16cb3fc92850335a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002b0db3c106855155290db3c5009a05076c85980315003cb1fcecb07c9c88258c000000000000000000000000101cb67ccc970fb001036453304c87f01ca0055605067ce14ce12f40001c8f40012f40012cb1f58fa02cdc9ed543f4203e0106910581047103948795387db3c248101012259f40d6fa192306ddf206e92306d9ad0d307d31f596c126f02e2206eb397206ef2d0806f2293307020e221c1028eac01a481010102c85902cb07cb1fc9103612206e953059f45a30944133f415e21069105810474566047101db3ce30e434c4001fe7032a48101015121c85902cb07cb1fc91713206e953059f45a30944133f415e2712a52a307c8553080335005cb1f13cecb07cb07cb1fc9c88258c000000000000000000000000101cb67ccc970fb0081010b54451a59f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e253606eb341026e8ea130206ef2d0806f275f061067105610451034413054180871db3c181716151443309131e2106910581047103640155033047101db3c464c03ae106910581047103948795387db3c238101012259f40d6fa192306ddf206e92306d9dd0d307d307d31f55206c136f03e2206eb397206ef2d0806f239430705300e222c1028e8f21c104975f041029373730e30d5523e30d434445001601d30a31d3ff3001aafbb201e401a420c0048e353031705202a42c7253d2c8553080335005cb1f13cecb07cb07cb1fc9c88258c000000000000000000000000101cb67ccc970fb0058de8101014313c855205023cb07cb07cb1fc9103512206e953059f45a30944133f415e2106910581047103645155033047201db3c55324c02fc02a48101015023c855205023cb07cb07cb1fc9103512206e953059f45a30944133f415e281010b54451a59f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e253606eb38ea530206ef2d0806f275f061067105610451034103854120872db3c10381037103610351034129131e2464b011ceda2edfb709320c1148ae85f04264704fe2881010b2559f40b6fa192306ddf206e92306d8e15d0fa40d33fd31fd307d30fd30fd33f55606c176f07e2206e955f0526db31e0206ef2d0806f27306c223224c0018e9031107c106b105a104910384cb029db3c8e9030107c106b105a104910384cb029db3ce29a3737383847654430db31e05196c705e3020aa4105a10494848494a000ca5ad71b0c001001a3636373754165645404330db31000c103847601034011e10691058104710364033047201db3c4c01da23544303c8553080325005cb1f13ce01fa02cb07cb07c9c88258c000000000000000000000000101cb67ccc970fb00820afaf080a171885a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb004d00000006f2c082ac7868c4');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initTonGridMain_init_args({ $$type: 'TonGridMain_init_args', owner, poolContract })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const TonGridMain_errors = {
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
    1494: { message: "Send 2 TON to register" },
    3745: { message: "Level must be between 2 and 15" },
    9603: { message: "Not registered" },
    21101: { message: "Already registered" },
    49723: { message: "Insufficient TON sent for level activation" },
    59664: { message: "Activate previous level first" },
    62128: { message: "Level already active" },
} as const

export const TonGridMain_errors_backward = {
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
    "Send 2 TON to register": 1494,
    "Level must be between 2 and 15": 3745,
    "Not registered": 9603,
    "Already registered": 21101,
    "Insufficient TON sent for level activation": 49723,
    "Activate previous level first": 59664,
    "Level already active": 62128,
} as const

const TonGridMain_types: ABIType[] = [
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
    {"name":"UserData","header":null,"fields":[{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}},{"name":"regTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"directRefs","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"rank","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"x3ActiveLevels","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"x6ActiveLevels","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"score","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"X3State","header":null,"fields":[{"name":"slots","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"cycles","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"X6State","header":null,"fields":[{"name":"row1","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"row2","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"cycles","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Register","header":16,"fields":[{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ActivateLevel","header":17,"fields":[{"name":"level","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"EvtRegistered","header":48,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}},{"name":"time","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"EvtLevelActivated","header":49,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"level","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"EvtRewardPaid","header":50,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"level","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"matrix","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"EvtCycle","header":51,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"matrix","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"level","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"cycles","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"EvtRankUp","header":52,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"newRank","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"TonGridMain$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"poolContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"users","type":{"kind":"dict","key":"address","value":"UserData","valueFormat":"ref"}},{"name":"x3","type":{"kind":"dict","key":"int","value":"X3State","valueFormat":"ref"}},{"name":"x6","type":{"kind":"dict","key":"int","value":"X6State","valueFormat":"ref"}},{"name":"totalUsers","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"totalVolume","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const TonGridMain_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "Register": 16,
    "ActivateLevel": 17,
    "EvtRegistered": 48,
    "EvtLevelActivated": 49,
    "EvtRewardPaid": 50,
    "EvtCycle": 51,
    "EvtRankUp": 52,
}

const TonGridMain_getters: ABIGetter[] = [
    {"name":"getUser","methodId":114923,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"UserData","optional":true}},
    {"name":"getX3State","methodId":120978,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"level","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"X3State","optional":true}},
    {"name":"getX6State","methodId":105363,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"level","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"X6State","optional":true}},
    {"name":"isRegistered","methodId":104754,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"getTotalUsers","methodId":106133,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getTotalVolume","methodId":121982,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getUserRank","methodId":74372,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getUserScore","methodId":95681,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"isX3LevelActive","methodId":129202,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"level","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"isX6LevelActive","methodId":128531,"arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"level","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"getOwner","methodId":102025,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getPoolContract","methodId":93121,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const TonGridMain_getterMapping: { [key: string]: string } = {
    'getUser': 'getGetUser',
    'getX3State': 'getGetX3State',
    'getX6State': 'getGetX6State',
    'isRegistered': 'getIsRegistered',
    'getTotalUsers': 'getGetTotalUsers',
    'getTotalVolume': 'getGetTotalVolume',
    'getUserRank': 'getGetUserRank',
    'getUserScore': 'getGetUserScore',
    'isX3LevelActive': 'getIsX3LevelActive',
    'isX6LevelActive': 'getIsX6LevelActive',
    'getOwner': 'getGetOwner',
    'getPoolContract': 'getGetPoolContract',
}

const TonGridMain_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Register"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ActivateLevel"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export const REG_FEE = 2000000000n;
export const POOL_PERCENT = 10n;
export const MAX_LEVELS = 15n;
export const GAS_RESERVE = 50000000n;
export const MAX_UPLINE_SEARCH = 20n;

export class TonGridMain implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = TonGridMain_errors_backward;
    public static readonly opcodes = TonGridMain_opcodes;
    
    static async init(owner: Address, poolContract: Address) {
        return await TonGridMain_init(owner, poolContract);
    }
    
    static async fromInit(owner: Address, poolContract: Address) {
        const __gen_init = await TonGridMain_init(owner, poolContract);
        const address = contractAddress(0, __gen_init);
        return new TonGridMain(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new TonGridMain(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TonGridMain_types,
        getters: TonGridMain_getters,
        receivers: TonGridMain_receivers,
        errors: TonGridMain_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Register | ActivateLevel | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Register') {
            body = beginCell().store(storeRegister(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ActivateLevel') {
            body = beginCell().store(storeActivateLevel(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetUser(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getUser', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleUserData(result_p) : null;
        return result;
    }
    
    async getGetX3State(provider: ContractProvider, addr: Address, level: bigint) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        builder.writeNumber(level);
        const source = (await provider.get('getX3State', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleX3State(result_p) : null;
        return result;
    }
    
    async getGetX6State(provider: ContractProvider, addr: Address, level: bigint) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        builder.writeNumber(level);
        const source = (await provider.get('getX6State', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleX6State(result_p) : null;
        return result;
    }
    
    async getIsRegistered(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('isRegistered', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getGetTotalUsers(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getTotalUsers', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetTotalVolume(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getTotalVolume', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetUserRank(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getUserRank', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetUserScore(provider: ContractProvider, addr: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        const source = (await provider.get('getUserScore', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getIsX3LevelActive(provider: ContractProvider, addr: Address, level: bigint) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        builder.writeNumber(level);
        const source = (await provider.get('isX3LevelActive', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getIsX6LevelActive(provider: ContractProvider, addr: Address, level: bigint) {
        const builder = new TupleBuilder();
        builder.writeAddress(addr);
        builder.writeNumber(level);
        const source = (await provider.get('isX6LevelActive', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getGetOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getOwner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getGetPoolContract(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getPoolContract', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}
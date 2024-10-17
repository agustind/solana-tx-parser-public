import {
	addCodecSizePrefix,
	getOptionCodec,
	getU32Codec,
	getU64Codec,
	getUtf8Codec,
} from "@solana/codecs";
import {
	getArrayCodec,
	getBooleanCodec,
	getBytesCodec,
	getDataEnumCodec,
	getStructCodec,
	getTupleCodec,
	getUnitCodec,
} from "@solana/codecs-data-structures";

export const metadataLayout = getStructCodec([
	["instruction", getBytesCodec({ size: 8 })],
	["name", addCodecSizePrefix(getUtf8Codec(), getU32Codec())],
	["symbol", addCodecSizePrefix(getUtf8Codec(), getU32Codec())],
	["uri", addCodecSizePrefix(getUtf8Codec(), getU32Codec())],
	[
		"additionalMetadata",
		getArrayCodec(
			getTupleCodec([
				addCodecSizePrefix(getUtf8Codec(), getU32Codec()),
				addCodecSizePrefix(getUtf8Codec(), getU32Codec()),
			]),
		),
	],
]);

const getFieldCodec = () =>
	[
		["Name", getUnitCodec()],
		["Symbol", getUnitCodec()],
		["Uri", getUnitCodec()],
		[
			"Key",
			getStructCodec([
				[
					"value",
					getTupleCodec([addCodecSizePrefix(getUtf8Codec(), getU32Codec())]),
				],
			]),
		],
	] as const;

export const updateMetadataLayout = getStructCodec([
	["instruction", getBytesCodec({ size: 8 })],
	["field", getDataEnumCodec(getFieldCodec())],
	["value", addCodecSizePrefix(getUtf8Codec(), getU32Codec())],
]);

export const removeKeyLayout = getStructCodec([
	["idempotent", getBooleanCodec()],
	["key", addCodecSizePrefix(getUtf8Codec(), getU32Codec())],
]);

export const updateAuthorityLayout = getStructCodec([
	["newAuthority", getBytesCodec({ size: 32 })],
]);

export const emitLayout = getStructCodec([
	["start", getOptionCodec(getU64Codec())],
	["end", getOptionCodec(getU64Codec())],
]);

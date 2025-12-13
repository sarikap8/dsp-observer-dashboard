
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model QuestionResponse
 * 
 */
export type QuestionResponse = $Result.DefaultSelection<Prisma.$QuestionResponsePayload>
/**
 * Model Observer
 * 
 */
export type Observer = $Result.DefaultSelection<Prisma.$ObserverPayload>
/**
 * Model ObserverSubmission
 * 
 */
export type ObserverSubmission = $Result.DefaultSelection<Prisma.$ObserverSubmissionPayload>
/**
 * Model Dsp
 * 
 */
export type Dsp = $Result.DefaultSelection<Prisma.$DspPayload>
/**
 * Model DspSubmission
 * 
 */
export type DspSubmission = $Result.DefaultSelection<Prisma.$DspSubmissionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more QuestionResponses
 * const questionResponses = await prisma.questionResponse.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more QuestionResponses
   * const questionResponses = await prisma.questionResponse.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.questionResponse`: Exposes CRUD operations for the **QuestionResponse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionResponses
    * const questionResponses = await prisma.questionResponse.findMany()
    * ```
    */
  get questionResponse(): Prisma.QuestionResponseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.observer`: Exposes CRUD operations for the **Observer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Observers
    * const observers = await prisma.observer.findMany()
    * ```
    */
  get observer(): Prisma.ObserverDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.observerSubmission`: Exposes CRUD operations for the **ObserverSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ObserverSubmissions
    * const observerSubmissions = await prisma.observerSubmission.findMany()
    * ```
    */
  get observerSubmission(): Prisma.ObserverSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dsp`: Exposes CRUD operations for the **Dsp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dsps
    * const dsps = await prisma.dsp.findMany()
    * ```
    */
  get dsp(): Prisma.DspDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dspSubmission`: Exposes CRUD operations for the **DspSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DspSubmissions
    * const dspSubmissions = await prisma.dspSubmission.findMany()
    * ```
    */
  get dspSubmission(): Prisma.DspSubmissionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.1
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    QuestionResponse: 'QuestionResponse',
    Observer: 'Observer',
    ObserverSubmission: 'ObserverSubmission',
    Dsp: 'Dsp',
    DspSubmission: 'DspSubmission'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "questionResponse" | "observer" | "observerSubmission" | "dsp" | "dspSubmission"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      QuestionResponse: {
        payload: Prisma.$QuestionResponsePayload<ExtArgs>
        fields: Prisma.QuestionResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload>
          }
          findFirst: {
            args: Prisma.QuestionResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload>
          }
          findMany: {
            args: Prisma.QuestionResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload>[]
          }
          create: {
            args: Prisma.QuestionResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload>
          }
          createMany: {
            args: Prisma.QuestionResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload>[]
          }
          delete: {
            args: Prisma.QuestionResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload>
          }
          update: {
            args: Prisma.QuestionResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload>
          }
          deleteMany: {
            args: Prisma.QuestionResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionResponseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload>[]
          }
          upsert: {
            args: Prisma.QuestionResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionResponsePayload>
          }
          aggregate: {
            args: Prisma.QuestionResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionResponse>
          }
          groupBy: {
            args: Prisma.QuestionResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionResponseCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionResponseCountAggregateOutputType> | number
          }
        }
      }
      Observer: {
        payload: Prisma.$ObserverPayload<ExtArgs>
        fields: Prisma.ObserverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ObserverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ObserverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload>
          }
          findFirst: {
            args: Prisma.ObserverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ObserverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload>
          }
          findMany: {
            args: Prisma.ObserverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload>[]
          }
          create: {
            args: Prisma.ObserverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload>
          }
          createMany: {
            args: Prisma.ObserverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ObserverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload>[]
          }
          delete: {
            args: Prisma.ObserverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload>
          }
          update: {
            args: Prisma.ObserverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload>
          }
          deleteMany: {
            args: Prisma.ObserverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ObserverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ObserverUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload>[]
          }
          upsert: {
            args: Prisma.ObserverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverPayload>
          }
          aggregate: {
            args: Prisma.ObserverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateObserver>
          }
          groupBy: {
            args: Prisma.ObserverGroupByArgs<ExtArgs>
            result: $Utils.Optional<ObserverGroupByOutputType>[]
          }
          count: {
            args: Prisma.ObserverCountArgs<ExtArgs>
            result: $Utils.Optional<ObserverCountAggregateOutputType> | number
          }
        }
      }
      ObserverSubmission: {
        payload: Prisma.$ObserverSubmissionPayload<ExtArgs>
        fields: Prisma.ObserverSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ObserverSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ObserverSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload>
          }
          findFirst: {
            args: Prisma.ObserverSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ObserverSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload>
          }
          findMany: {
            args: Prisma.ObserverSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload>[]
          }
          create: {
            args: Prisma.ObserverSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload>
          }
          createMany: {
            args: Prisma.ObserverSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ObserverSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload>[]
          }
          delete: {
            args: Prisma.ObserverSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload>
          }
          update: {
            args: Prisma.ObserverSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.ObserverSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ObserverSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ObserverSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.ObserverSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObserverSubmissionPayload>
          }
          aggregate: {
            args: Prisma.ObserverSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateObserverSubmission>
          }
          groupBy: {
            args: Prisma.ObserverSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ObserverSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ObserverSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<ObserverSubmissionCountAggregateOutputType> | number
          }
        }
      }
      Dsp: {
        payload: Prisma.$DspPayload<ExtArgs>
        fields: Prisma.DspFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DspFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DspFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload>
          }
          findFirst: {
            args: Prisma.DspFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DspFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload>
          }
          findMany: {
            args: Prisma.DspFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload>[]
          }
          create: {
            args: Prisma.DspCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload>
          }
          createMany: {
            args: Prisma.DspCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DspCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload>[]
          }
          delete: {
            args: Prisma.DspDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload>
          }
          update: {
            args: Prisma.DspUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload>
          }
          deleteMany: {
            args: Prisma.DspDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DspUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DspUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload>[]
          }
          upsert: {
            args: Prisma.DspUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspPayload>
          }
          aggregate: {
            args: Prisma.DspAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDsp>
          }
          groupBy: {
            args: Prisma.DspGroupByArgs<ExtArgs>
            result: $Utils.Optional<DspGroupByOutputType>[]
          }
          count: {
            args: Prisma.DspCountArgs<ExtArgs>
            result: $Utils.Optional<DspCountAggregateOutputType> | number
          }
        }
      }
      DspSubmission: {
        payload: Prisma.$DspSubmissionPayload<ExtArgs>
        fields: Prisma.DspSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DspSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DspSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload>
          }
          findFirst: {
            args: Prisma.DspSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DspSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload>
          }
          findMany: {
            args: Prisma.DspSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload>[]
          }
          create: {
            args: Prisma.DspSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload>
          }
          createMany: {
            args: Prisma.DspSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DspSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload>[]
          }
          delete: {
            args: Prisma.DspSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload>
          }
          update: {
            args: Prisma.DspSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.DspSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DspSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DspSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.DspSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DspSubmissionPayload>
          }
          aggregate: {
            args: Prisma.DspSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDspSubmission>
          }
          groupBy: {
            args: Prisma.DspSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DspSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DspSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<DspSubmissionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    questionResponse?: QuestionResponseOmit
    observer?: ObserverOmit
    observerSubmission?: ObserverSubmissionOmit
    dsp?: DspOmit
    dspSubmission?: DspSubmissionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ObserverCountOutputType
   */

  export type ObserverCountOutputType = {
    submissions: number
  }

  export type ObserverCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | ObserverCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * ObserverCountOutputType without action
   */
  export type ObserverCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverCountOutputType
     */
    select?: ObserverCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ObserverCountOutputType without action
   */
  export type ObserverCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ObserverSubmissionWhereInput
  }


  /**
   * Count Type DspCountOutputType
   */

  export type DspCountOutputType = {
    observerSubmissions: number
  }

  export type DspCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    observerSubmissions?: boolean | DspCountOutputTypeCountObserverSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * DspCountOutputType without action
   */
  export type DspCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspCountOutputType
     */
    select?: DspCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DspCountOutputType without action
   */
  export type DspCountOutputTypeCountObserverSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ObserverSubmissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model QuestionResponse
   */

  export type AggregateQuestionResponse = {
    _count: QuestionResponseCountAggregateOutputType | null
    _avg: QuestionResponseAvgAggregateOutputType | null
    _sum: QuestionResponseSumAggregateOutputType | null
    _min: QuestionResponseMinAggregateOutputType | null
    _max: QuestionResponseMaxAggregateOutputType | null
  }

  export type QuestionResponseAvgAggregateOutputType = {
    q1: number | null
    q2: number | null
    q3: number | null
    q4: number | null
    q5: number | null
    q6: number | null
    q7: number | null
    q8: number | null
    q9: number | null
    q10: number | null
    q11: number | null
    q12: number | null
    q13: number | null
    q14: number | null
    q15: number | null
    q16: number | null
    q17: number | null
    q18: number | null
    q19: number | null
    q20: number | null
    q21: number | null
    q22: number | null
    q23: number | null
    q24: number | null
    q25: number | null
    q26: number | null
    q27: number | null
    q28: number | null
    q29: number | null
    q30: number | null
    q31: number | null
    q32: number | null
    q33: number | null
  }

  export type QuestionResponseSumAggregateOutputType = {
    q1: number | null
    q2: number | null
    q3: number | null
    q4: number | null
    q5: number | null
    q6: number | null
    q7: number | null
    q8: number | null
    q9: number | null
    q10: number | null
    q11: number | null
    q12: number | null
    q13: number | null
    q14: number | null
    q15: number | null
    q16: number | null
    q17: number | null
    q18: number | null
    q19: number | null
    q20: number | null
    q21: number | null
    q22: number | null
    q23: number | null
    q24: number | null
    q25: number | null
    q26: number | null
    q27: number | null
    q28: number | null
    q29: number | null
    q30: number | null
    q31: number | null
    q32: number | null
    q33: number | null
  }

  export type QuestionResponseMinAggregateOutputType = {
    id: string | null
    q1: number | null
    q2: number | null
    q3: number | null
    q4: number | null
    q5: number | null
    q6: number | null
    q7: number | null
    q8: number | null
    q9: number | null
    q10: number | null
    q11: number | null
    q12: number | null
    q13: number | null
    q14: number | null
    q15: number | null
    q16: number | null
    q17: number | null
    q18: number | null
    q19: number | null
    q20: number | null
    q21: number | null
    q22: number | null
    q23: number | null
    q24: number | null
    q25: number | null
    q26: number | null
    q27: number | null
    q28: number | null
    q29: number | null
    q30: number | null
    q31: number | null
    q32: number | null
    q33: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionResponseMaxAggregateOutputType = {
    id: string | null
    q1: number | null
    q2: number | null
    q3: number | null
    q4: number | null
    q5: number | null
    q6: number | null
    q7: number | null
    q8: number | null
    q9: number | null
    q10: number | null
    q11: number | null
    q12: number | null
    q13: number | null
    q14: number | null
    q15: number | null
    q16: number | null
    q17: number | null
    q18: number | null
    q19: number | null
    q20: number | null
    q21: number | null
    q22: number | null
    q23: number | null
    q24: number | null
    q25: number | null
    q26: number | null
    q27: number | null
    q28: number | null
    q29: number | null
    q30: number | null
    q31: number | null
    q32: number | null
    q33: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionResponseCountAggregateOutputType = {
    id: number
    q1: number
    q2: number
    q3: number
    q4: number
    q5: number
    q6: number
    q7: number
    q8: number
    q9: number
    q10: number
    q11: number
    q12: number
    q13: number
    q14: number
    q15: number
    q16: number
    q17: number
    q18: number
    q19: number
    q20: number
    q21: number
    q22: number
    q23: number
    q24: number
    q25: number
    q26: number
    q27: number
    q28: number
    q29: number
    q30: number
    q31: number
    q32: number
    q33: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuestionResponseAvgAggregateInputType = {
    q1?: true
    q2?: true
    q3?: true
    q4?: true
    q5?: true
    q6?: true
    q7?: true
    q8?: true
    q9?: true
    q10?: true
    q11?: true
    q12?: true
    q13?: true
    q14?: true
    q15?: true
    q16?: true
    q17?: true
    q18?: true
    q19?: true
    q20?: true
    q21?: true
    q22?: true
    q23?: true
    q24?: true
    q25?: true
    q26?: true
    q27?: true
    q28?: true
    q29?: true
    q30?: true
    q31?: true
    q32?: true
    q33?: true
  }

  export type QuestionResponseSumAggregateInputType = {
    q1?: true
    q2?: true
    q3?: true
    q4?: true
    q5?: true
    q6?: true
    q7?: true
    q8?: true
    q9?: true
    q10?: true
    q11?: true
    q12?: true
    q13?: true
    q14?: true
    q15?: true
    q16?: true
    q17?: true
    q18?: true
    q19?: true
    q20?: true
    q21?: true
    q22?: true
    q23?: true
    q24?: true
    q25?: true
    q26?: true
    q27?: true
    q28?: true
    q29?: true
    q30?: true
    q31?: true
    q32?: true
    q33?: true
  }

  export type QuestionResponseMinAggregateInputType = {
    id?: true
    q1?: true
    q2?: true
    q3?: true
    q4?: true
    q5?: true
    q6?: true
    q7?: true
    q8?: true
    q9?: true
    q10?: true
    q11?: true
    q12?: true
    q13?: true
    q14?: true
    q15?: true
    q16?: true
    q17?: true
    q18?: true
    q19?: true
    q20?: true
    q21?: true
    q22?: true
    q23?: true
    q24?: true
    q25?: true
    q26?: true
    q27?: true
    q28?: true
    q29?: true
    q30?: true
    q31?: true
    q32?: true
    q33?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionResponseMaxAggregateInputType = {
    id?: true
    q1?: true
    q2?: true
    q3?: true
    q4?: true
    q5?: true
    q6?: true
    q7?: true
    q8?: true
    q9?: true
    q10?: true
    q11?: true
    q12?: true
    q13?: true
    q14?: true
    q15?: true
    q16?: true
    q17?: true
    q18?: true
    q19?: true
    q20?: true
    q21?: true
    q22?: true
    q23?: true
    q24?: true
    q25?: true
    q26?: true
    q27?: true
    q28?: true
    q29?: true
    q30?: true
    q31?: true
    q32?: true
    q33?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionResponseCountAggregateInputType = {
    id?: true
    q1?: true
    q2?: true
    q3?: true
    q4?: true
    q5?: true
    q6?: true
    q7?: true
    q8?: true
    q9?: true
    q10?: true
    q11?: true
    q12?: true
    q13?: true
    q14?: true
    q15?: true
    q16?: true
    q17?: true
    q18?: true
    q19?: true
    q20?: true
    q21?: true
    q22?: true
    q23?: true
    q24?: true
    q25?: true
    q26?: true
    q27?: true
    q28?: true
    q29?: true
    q30?: true
    q31?: true
    q32?: true
    q33?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuestionResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionResponse to aggregate.
     */
    where?: QuestionResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionResponses to fetch.
     */
    orderBy?: QuestionResponseOrderByWithRelationInput | QuestionResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionResponses
    **/
    _count?: true | QuestionResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionResponseMaxAggregateInputType
  }

  export type GetQuestionResponseAggregateType<T extends QuestionResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionResponse[P]>
      : GetScalarType<T[P], AggregateQuestionResponse[P]>
  }




  export type QuestionResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionResponseWhereInput
    orderBy?: QuestionResponseOrderByWithAggregationInput | QuestionResponseOrderByWithAggregationInput[]
    by: QuestionResponseScalarFieldEnum[] | QuestionResponseScalarFieldEnum
    having?: QuestionResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionResponseCountAggregateInputType | true
    _avg?: QuestionResponseAvgAggregateInputType
    _sum?: QuestionResponseSumAggregateInputType
    _min?: QuestionResponseMinAggregateInputType
    _max?: QuestionResponseMaxAggregateInputType
  }

  export type QuestionResponseGroupByOutputType = {
    id: string
    q1: number | null
    q2: number | null
    q3: number | null
    q4: number | null
    q5: number | null
    q6: number | null
    q7: number | null
    q8: number | null
    q9: number | null
    q10: number | null
    q11: number | null
    q12: number | null
    q13: number | null
    q14: number | null
    q15: number | null
    q16: number | null
    q17: number | null
    q18: number | null
    q19: number | null
    q20: number | null
    q21: number | null
    q22: number | null
    q23: number | null
    q24: number | null
    q25: number | null
    q26: number | null
    q27: number | null
    q28: number | null
    q29: number | null
    q30: number | null
    q31: number | null
    q32: number | null
    q33: number | null
    createdAt: Date
    updatedAt: Date
    _count: QuestionResponseCountAggregateOutputType | null
    _avg: QuestionResponseAvgAggregateOutputType | null
    _sum: QuestionResponseSumAggregateOutputType | null
    _min: QuestionResponseMinAggregateOutputType | null
    _max: QuestionResponseMaxAggregateOutputType | null
  }

  type GetQuestionResponseGroupByPayload<T extends QuestionResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionResponseGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionResponseGroupByOutputType[P]>
        }
      >
    >


  export type QuestionResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    q1?: boolean
    q2?: boolean
    q3?: boolean
    q4?: boolean
    q5?: boolean
    q6?: boolean
    q7?: boolean
    q8?: boolean
    q9?: boolean
    q10?: boolean
    q11?: boolean
    q12?: boolean
    q13?: boolean
    q14?: boolean
    q15?: boolean
    q16?: boolean
    q17?: boolean
    q18?: boolean
    q19?: boolean
    q20?: boolean
    q21?: boolean
    q22?: boolean
    q23?: boolean
    q24?: boolean
    q25?: boolean
    q26?: boolean
    q27?: boolean
    q28?: boolean
    q29?: boolean
    q30?: boolean
    q31?: boolean
    q32?: boolean
    q33?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    observerSubmission?: boolean | QuestionResponse$observerSubmissionArgs<ExtArgs>
    dspSubmission?: boolean | QuestionResponse$dspSubmissionArgs<ExtArgs>
  }, ExtArgs["result"]["questionResponse"]>

  export type QuestionResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    q1?: boolean
    q2?: boolean
    q3?: boolean
    q4?: boolean
    q5?: boolean
    q6?: boolean
    q7?: boolean
    q8?: boolean
    q9?: boolean
    q10?: boolean
    q11?: boolean
    q12?: boolean
    q13?: boolean
    q14?: boolean
    q15?: boolean
    q16?: boolean
    q17?: boolean
    q18?: boolean
    q19?: boolean
    q20?: boolean
    q21?: boolean
    q22?: boolean
    q23?: boolean
    q24?: boolean
    q25?: boolean
    q26?: boolean
    q27?: boolean
    q28?: boolean
    q29?: boolean
    q30?: boolean
    q31?: boolean
    q32?: boolean
    q33?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["questionResponse"]>

  export type QuestionResponseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    q1?: boolean
    q2?: boolean
    q3?: boolean
    q4?: boolean
    q5?: boolean
    q6?: boolean
    q7?: boolean
    q8?: boolean
    q9?: boolean
    q10?: boolean
    q11?: boolean
    q12?: boolean
    q13?: boolean
    q14?: boolean
    q15?: boolean
    q16?: boolean
    q17?: boolean
    q18?: boolean
    q19?: boolean
    q20?: boolean
    q21?: boolean
    q22?: boolean
    q23?: boolean
    q24?: boolean
    q25?: boolean
    q26?: boolean
    q27?: boolean
    q28?: boolean
    q29?: boolean
    q30?: boolean
    q31?: boolean
    q32?: boolean
    q33?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["questionResponse"]>

  export type QuestionResponseSelectScalar = {
    id?: boolean
    q1?: boolean
    q2?: boolean
    q3?: boolean
    q4?: boolean
    q5?: boolean
    q6?: boolean
    q7?: boolean
    q8?: boolean
    q9?: boolean
    q10?: boolean
    q11?: boolean
    q12?: boolean
    q13?: boolean
    q14?: boolean
    q15?: boolean
    q16?: boolean
    q17?: boolean
    q18?: boolean
    q19?: boolean
    q20?: boolean
    q21?: boolean
    q22?: boolean
    q23?: boolean
    q24?: boolean
    q25?: boolean
    q26?: boolean
    q27?: boolean
    q28?: boolean
    q29?: boolean
    q30?: boolean
    q31?: boolean
    q32?: boolean
    q33?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuestionResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8" | "q9" | "q10" | "q11" | "q12" | "q13" | "q14" | "q15" | "q16" | "q17" | "q18" | "q19" | "q20" | "q21" | "q22" | "q23" | "q24" | "q25" | "q26" | "q27" | "q28" | "q29" | "q30" | "q31" | "q32" | "q33" | "createdAt" | "updatedAt", ExtArgs["result"]["questionResponse"]>
  export type QuestionResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    observerSubmission?: boolean | QuestionResponse$observerSubmissionArgs<ExtArgs>
    dspSubmission?: boolean | QuestionResponse$dspSubmissionArgs<ExtArgs>
  }
  export type QuestionResponseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type QuestionResponseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $QuestionResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionResponse"
    objects: {
      observerSubmission: Prisma.$ObserverSubmissionPayload<ExtArgs> | null
      dspSubmission: Prisma.$DspSubmissionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      q1: number | null
      q2: number | null
      q3: number | null
      q4: number | null
      q5: number | null
      q6: number | null
      q7: number | null
      q8: number | null
      q9: number | null
      q10: number | null
      q11: number | null
      q12: number | null
      q13: number | null
      q14: number | null
      q15: number | null
      q16: number | null
      q17: number | null
      q18: number | null
      q19: number | null
      q20: number | null
      q21: number | null
      q22: number | null
      q23: number | null
      q24: number | null
      q25: number | null
      q26: number | null
      q27: number | null
      q28: number | null
      q29: number | null
      q30: number | null
      q31: number | null
      q32: number | null
      q33: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["questionResponse"]>
    composites: {}
  }

  type QuestionResponseGetPayload<S extends boolean | null | undefined | QuestionResponseDefaultArgs> = $Result.GetResult<Prisma.$QuestionResponsePayload, S>

  type QuestionResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionResponseCountAggregateInputType | true
    }

  export interface QuestionResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionResponse'], meta: { name: 'QuestionResponse' } }
    /**
     * Find zero or one QuestionResponse that matches the filter.
     * @param {QuestionResponseFindUniqueArgs} args - Arguments to find a QuestionResponse
     * @example
     * // Get one QuestionResponse
     * const questionResponse = await prisma.questionResponse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionResponseFindUniqueArgs>(args: SelectSubset<T, QuestionResponseFindUniqueArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuestionResponse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionResponseFindUniqueOrThrowArgs} args - Arguments to find a QuestionResponse
     * @example
     * // Get one QuestionResponse
     * const questionResponse = await prisma.questionResponse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionResponse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionResponseFindFirstArgs} args - Arguments to find a QuestionResponse
     * @example
     * // Get one QuestionResponse
     * const questionResponse = await prisma.questionResponse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionResponseFindFirstArgs>(args?: SelectSubset<T, QuestionResponseFindFirstArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionResponse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionResponseFindFirstOrThrowArgs} args - Arguments to find a QuestionResponse
     * @example
     * // Get one QuestionResponse
     * const questionResponse = await prisma.questionResponse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuestionResponses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionResponses
     * const questionResponses = await prisma.questionResponse.findMany()
     * 
     * // Get first 10 QuestionResponses
     * const questionResponses = await prisma.questionResponse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionResponseWithIdOnly = await prisma.questionResponse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionResponseFindManyArgs>(args?: SelectSubset<T, QuestionResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuestionResponse.
     * @param {QuestionResponseCreateArgs} args - Arguments to create a QuestionResponse.
     * @example
     * // Create one QuestionResponse
     * const QuestionResponse = await prisma.questionResponse.create({
     *   data: {
     *     // ... data to create a QuestionResponse
     *   }
     * })
     * 
     */
    create<T extends QuestionResponseCreateArgs>(args: SelectSubset<T, QuestionResponseCreateArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuestionResponses.
     * @param {QuestionResponseCreateManyArgs} args - Arguments to create many QuestionResponses.
     * @example
     * // Create many QuestionResponses
     * const questionResponse = await prisma.questionResponse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionResponseCreateManyArgs>(args?: SelectSubset<T, QuestionResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuestionResponses and returns the data saved in the database.
     * @param {QuestionResponseCreateManyAndReturnArgs} args - Arguments to create many QuestionResponses.
     * @example
     * // Create many QuestionResponses
     * const questionResponse = await prisma.questionResponse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuestionResponses and only return the `id`
     * const questionResponseWithIdOnly = await prisma.questionResponse.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuestionResponse.
     * @param {QuestionResponseDeleteArgs} args - Arguments to delete one QuestionResponse.
     * @example
     * // Delete one QuestionResponse
     * const QuestionResponse = await prisma.questionResponse.delete({
     *   where: {
     *     // ... filter to delete one QuestionResponse
     *   }
     * })
     * 
     */
    delete<T extends QuestionResponseDeleteArgs>(args: SelectSubset<T, QuestionResponseDeleteArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuestionResponse.
     * @param {QuestionResponseUpdateArgs} args - Arguments to update one QuestionResponse.
     * @example
     * // Update one QuestionResponse
     * const questionResponse = await prisma.questionResponse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionResponseUpdateArgs>(args: SelectSubset<T, QuestionResponseUpdateArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuestionResponses.
     * @param {QuestionResponseDeleteManyArgs} args - Arguments to filter QuestionResponses to delete.
     * @example
     * // Delete a few QuestionResponses
     * const { count } = await prisma.questionResponse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionResponseDeleteManyArgs>(args?: SelectSubset<T, QuestionResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionResponses
     * const questionResponse = await prisma.questionResponse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionResponseUpdateManyArgs>(args: SelectSubset<T, QuestionResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionResponses and returns the data updated in the database.
     * @param {QuestionResponseUpdateManyAndReturnArgs} args - Arguments to update many QuestionResponses.
     * @example
     * // Update many QuestionResponses
     * const questionResponse = await prisma.questionResponse.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuestionResponses and only return the `id`
     * const questionResponseWithIdOnly = await prisma.questionResponse.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuestionResponseUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionResponseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuestionResponse.
     * @param {QuestionResponseUpsertArgs} args - Arguments to update or create a QuestionResponse.
     * @example
     * // Update or create a QuestionResponse
     * const questionResponse = await prisma.questionResponse.upsert({
     *   create: {
     *     // ... data to create a QuestionResponse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionResponse we want to update
     *   }
     * })
     */
    upsert<T extends QuestionResponseUpsertArgs>(args: SelectSubset<T, QuestionResponseUpsertArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuestionResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionResponseCountArgs} args - Arguments to filter QuestionResponses to count.
     * @example
     * // Count the number of QuestionResponses
     * const count = await prisma.questionResponse.count({
     *   where: {
     *     // ... the filter for the QuestionResponses we want to count
     *   }
     * })
    **/
    count<T extends QuestionResponseCountArgs>(
      args?: Subset<T, QuestionResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionResponseAggregateArgs>(args: Subset<T, QuestionResponseAggregateArgs>): Prisma.PrismaPromise<GetQuestionResponseAggregateType<T>>

    /**
     * Group by QuestionResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionResponseGroupByArgs['orderBy'] }
        : { orderBy?: QuestionResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionResponse model
   */
  readonly fields: QuestionResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionResponse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    observerSubmission<T extends QuestionResponse$observerSubmissionArgs<ExtArgs> = {}>(args?: Subset<T, QuestionResponse$observerSubmissionArgs<ExtArgs>>): Prisma__ObserverSubmissionClient<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    dspSubmission<T extends QuestionResponse$dspSubmissionArgs<ExtArgs> = {}>(args?: Subset<T, QuestionResponse$dspSubmissionArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuestionResponse model
   */
  interface QuestionResponseFieldRefs {
    readonly id: FieldRef<"QuestionResponse", 'String'>
    readonly q1: FieldRef<"QuestionResponse", 'Int'>
    readonly q2: FieldRef<"QuestionResponse", 'Int'>
    readonly q3: FieldRef<"QuestionResponse", 'Int'>
    readonly q4: FieldRef<"QuestionResponse", 'Int'>
    readonly q5: FieldRef<"QuestionResponse", 'Int'>
    readonly q6: FieldRef<"QuestionResponse", 'Int'>
    readonly q7: FieldRef<"QuestionResponse", 'Int'>
    readonly q8: FieldRef<"QuestionResponse", 'Int'>
    readonly q9: FieldRef<"QuestionResponse", 'Int'>
    readonly q10: FieldRef<"QuestionResponse", 'Int'>
    readonly q11: FieldRef<"QuestionResponse", 'Int'>
    readonly q12: FieldRef<"QuestionResponse", 'Int'>
    readonly q13: FieldRef<"QuestionResponse", 'Int'>
    readonly q14: FieldRef<"QuestionResponse", 'Int'>
    readonly q15: FieldRef<"QuestionResponse", 'Int'>
    readonly q16: FieldRef<"QuestionResponse", 'Int'>
    readonly q17: FieldRef<"QuestionResponse", 'Int'>
    readonly q18: FieldRef<"QuestionResponse", 'Int'>
    readonly q19: FieldRef<"QuestionResponse", 'Int'>
    readonly q20: FieldRef<"QuestionResponse", 'Int'>
    readonly q21: FieldRef<"QuestionResponse", 'Int'>
    readonly q22: FieldRef<"QuestionResponse", 'Int'>
    readonly q23: FieldRef<"QuestionResponse", 'Int'>
    readonly q24: FieldRef<"QuestionResponse", 'Int'>
    readonly q25: FieldRef<"QuestionResponse", 'Int'>
    readonly q26: FieldRef<"QuestionResponse", 'Int'>
    readonly q27: FieldRef<"QuestionResponse", 'Int'>
    readonly q28: FieldRef<"QuestionResponse", 'Int'>
    readonly q29: FieldRef<"QuestionResponse", 'Int'>
    readonly q30: FieldRef<"QuestionResponse", 'Int'>
    readonly q31: FieldRef<"QuestionResponse", 'Int'>
    readonly q32: FieldRef<"QuestionResponse", 'Int'>
    readonly q33: FieldRef<"QuestionResponse", 'Int'>
    readonly createdAt: FieldRef<"QuestionResponse", 'DateTime'>
    readonly updatedAt: FieldRef<"QuestionResponse", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuestionResponse findUnique
   */
  export type QuestionResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
    /**
     * Filter, which QuestionResponse to fetch.
     */
    where: QuestionResponseWhereUniqueInput
  }

  /**
   * QuestionResponse findUniqueOrThrow
   */
  export type QuestionResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
    /**
     * Filter, which QuestionResponse to fetch.
     */
    where: QuestionResponseWhereUniqueInput
  }

  /**
   * QuestionResponse findFirst
   */
  export type QuestionResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
    /**
     * Filter, which QuestionResponse to fetch.
     */
    where?: QuestionResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionResponses to fetch.
     */
    orderBy?: QuestionResponseOrderByWithRelationInput | QuestionResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionResponses.
     */
    cursor?: QuestionResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionResponses.
     */
    distinct?: QuestionResponseScalarFieldEnum | QuestionResponseScalarFieldEnum[]
  }

  /**
   * QuestionResponse findFirstOrThrow
   */
  export type QuestionResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
    /**
     * Filter, which QuestionResponse to fetch.
     */
    where?: QuestionResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionResponses to fetch.
     */
    orderBy?: QuestionResponseOrderByWithRelationInput | QuestionResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionResponses.
     */
    cursor?: QuestionResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionResponses.
     */
    distinct?: QuestionResponseScalarFieldEnum | QuestionResponseScalarFieldEnum[]
  }

  /**
   * QuestionResponse findMany
   */
  export type QuestionResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
    /**
     * Filter, which QuestionResponses to fetch.
     */
    where?: QuestionResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionResponses to fetch.
     */
    orderBy?: QuestionResponseOrderByWithRelationInput | QuestionResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionResponses.
     */
    cursor?: QuestionResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionResponses.
     */
    skip?: number
    distinct?: QuestionResponseScalarFieldEnum | QuestionResponseScalarFieldEnum[]
  }

  /**
   * QuestionResponse create
   */
  export type QuestionResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestionResponse.
     */
    data: XOR<QuestionResponseCreateInput, QuestionResponseUncheckedCreateInput>
  }

  /**
   * QuestionResponse createMany
   */
  export type QuestionResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionResponses.
     */
    data: QuestionResponseCreateManyInput | QuestionResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestionResponse createManyAndReturn
   */
  export type QuestionResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * The data used to create many QuestionResponses.
     */
    data: QuestionResponseCreateManyInput | QuestionResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestionResponse update
   */
  export type QuestionResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestionResponse.
     */
    data: XOR<QuestionResponseUpdateInput, QuestionResponseUncheckedUpdateInput>
    /**
     * Choose, which QuestionResponse to update.
     */
    where: QuestionResponseWhereUniqueInput
  }

  /**
   * QuestionResponse updateMany
   */
  export type QuestionResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionResponses.
     */
    data: XOR<QuestionResponseUpdateManyMutationInput, QuestionResponseUncheckedUpdateManyInput>
    /**
     * Filter which QuestionResponses to update
     */
    where?: QuestionResponseWhereInput
    /**
     * Limit how many QuestionResponses to update.
     */
    limit?: number
  }

  /**
   * QuestionResponse updateManyAndReturn
   */
  export type QuestionResponseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * The data used to update QuestionResponses.
     */
    data: XOR<QuestionResponseUpdateManyMutationInput, QuestionResponseUncheckedUpdateManyInput>
    /**
     * Filter which QuestionResponses to update
     */
    where?: QuestionResponseWhereInput
    /**
     * Limit how many QuestionResponses to update.
     */
    limit?: number
  }

  /**
   * QuestionResponse upsert
   */
  export type QuestionResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestionResponse to update in case it exists.
     */
    where: QuestionResponseWhereUniqueInput
    /**
     * In case the QuestionResponse found by the `where` argument doesn't exist, create a new QuestionResponse with this data.
     */
    create: XOR<QuestionResponseCreateInput, QuestionResponseUncheckedCreateInput>
    /**
     * In case the QuestionResponse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionResponseUpdateInput, QuestionResponseUncheckedUpdateInput>
  }

  /**
   * QuestionResponse delete
   */
  export type QuestionResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
    /**
     * Filter which QuestionResponse to delete.
     */
    where: QuestionResponseWhereUniqueInput
  }

  /**
   * QuestionResponse deleteMany
   */
  export type QuestionResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionResponses to delete
     */
    where?: QuestionResponseWhereInput
    /**
     * Limit how many QuestionResponses to delete.
     */
    limit?: number
  }

  /**
   * QuestionResponse.observerSubmission
   */
  export type QuestionResponse$observerSubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    where?: ObserverSubmissionWhereInput
  }

  /**
   * QuestionResponse.dspSubmission
   */
  export type QuestionResponse$dspSubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    where?: DspSubmissionWhereInput
  }

  /**
   * QuestionResponse without action
   */
  export type QuestionResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionResponse
     */
    select?: QuestionResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionResponse
     */
    omit?: QuestionResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionResponseInclude<ExtArgs> | null
  }


  /**
   * Model Observer
   */

  export type AggregateObserver = {
    _count: ObserverCountAggregateOutputType | null
    _min: ObserverMinAggregateOutputType | null
    _max: ObserverMaxAggregateOutputType | null
  }

  export type ObserverMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ObserverMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ObserverCountAggregateOutputType = {
    id: number
    email: number
    name: number
    createdAt: number
    _all: number
  }


  export type ObserverMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
  }

  export type ObserverMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
  }

  export type ObserverCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type ObserverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Observer to aggregate.
     */
    where?: ObserverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observers to fetch.
     */
    orderBy?: ObserverOrderByWithRelationInput | ObserverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ObserverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Observers
    **/
    _count?: true | ObserverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ObserverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ObserverMaxAggregateInputType
  }

  export type GetObserverAggregateType<T extends ObserverAggregateArgs> = {
        [P in keyof T & keyof AggregateObserver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateObserver[P]>
      : GetScalarType<T[P], AggregateObserver[P]>
  }




  export type ObserverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ObserverWhereInput
    orderBy?: ObserverOrderByWithAggregationInput | ObserverOrderByWithAggregationInput[]
    by: ObserverScalarFieldEnum[] | ObserverScalarFieldEnum
    having?: ObserverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ObserverCountAggregateInputType | true
    _min?: ObserverMinAggregateInputType
    _max?: ObserverMaxAggregateInputType
  }

  export type ObserverGroupByOutputType = {
    id: string
    email: string
    name: string
    createdAt: Date
    _count: ObserverCountAggregateOutputType | null
    _min: ObserverMinAggregateOutputType | null
    _max: ObserverMaxAggregateOutputType | null
  }

  type GetObserverGroupByPayload<T extends ObserverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ObserverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ObserverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ObserverGroupByOutputType[P]>
            : GetScalarType<T[P], ObserverGroupByOutputType[P]>
        }
      >
    >


  export type ObserverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    submissions?: boolean | Observer$submissionsArgs<ExtArgs>
    _count?: boolean | ObserverCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["observer"]>

  export type ObserverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["observer"]>

  export type ObserverSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["observer"]>

  export type ObserverSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type ObserverOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "createdAt", ExtArgs["result"]["observer"]>
  export type ObserverInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | Observer$submissionsArgs<ExtArgs>
    _count?: boolean | ObserverCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ObserverIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ObserverIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ObserverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Observer"
    objects: {
      submissions: Prisma.$ObserverSubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["observer"]>
    composites: {}
  }

  type ObserverGetPayload<S extends boolean | null | undefined | ObserverDefaultArgs> = $Result.GetResult<Prisma.$ObserverPayload, S>

  type ObserverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ObserverFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ObserverCountAggregateInputType | true
    }

  export interface ObserverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Observer'], meta: { name: 'Observer' } }
    /**
     * Find zero or one Observer that matches the filter.
     * @param {ObserverFindUniqueArgs} args - Arguments to find a Observer
     * @example
     * // Get one Observer
     * const observer = await prisma.observer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ObserverFindUniqueArgs>(args: SelectSubset<T, ObserverFindUniqueArgs<ExtArgs>>): Prisma__ObserverClient<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Observer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ObserverFindUniqueOrThrowArgs} args - Arguments to find a Observer
     * @example
     * // Get one Observer
     * const observer = await prisma.observer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ObserverFindUniqueOrThrowArgs>(args: SelectSubset<T, ObserverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ObserverClient<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Observer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverFindFirstArgs} args - Arguments to find a Observer
     * @example
     * // Get one Observer
     * const observer = await prisma.observer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ObserverFindFirstArgs>(args?: SelectSubset<T, ObserverFindFirstArgs<ExtArgs>>): Prisma__ObserverClient<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Observer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverFindFirstOrThrowArgs} args - Arguments to find a Observer
     * @example
     * // Get one Observer
     * const observer = await prisma.observer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ObserverFindFirstOrThrowArgs>(args?: SelectSubset<T, ObserverFindFirstOrThrowArgs<ExtArgs>>): Prisma__ObserverClient<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Observers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Observers
     * const observers = await prisma.observer.findMany()
     * 
     * // Get first 10 Observers
     * const observers = await prisma.observer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const observerWithIdOnly = await prisma.observer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ObserverFindManyArgs>(args?: SelectSubset<T, ObserverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Observer.
     * @param {ObserverCreateArgs} args - Arguments to create a Observer.
     * @example
     * // Create one Observer
     * const Observer = await prisma.observer.create({
     *   data: {
     *     // ... data to create a Observer
     *   }
     * })
     * 
     */
    create<T extends ObserverCreateArgs>(args: SelectSubset<T, ObserverCreateArgs<ExtArgs>>): Prisma__ObserverClient<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Observers.
     * @param {ObserverCreateManyArgs} args - Arguments to create many Observers.
     * @example
     * // Create many Observers
     * const observer = await prisma.observer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ObserverCreateManyArgs>(args?: SelectSubset<T, ObserverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Observers and returns the data saved in the database.
     * @param {ObserverCreateManyAndReturnArgs} args - Arguments to create many Observers.
     * @example
     * // Create many Observers
     * const observer = await prisma.observer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Observers and only return the `id`
     * const observerWithIdOnly = await prisma.observer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ObserverCreateManyAndReturnArgs>(args?: SelectSubset<T, ObserverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Observer.
     * @param {ObserverDeleteArgs} args - Arguments to delete one Observer.
     * @example
     * // Delete one Observer
     * const Observer = await prisma.observer.delete({
     *   where: {
     *     // ... filter to delete one Observer
     *   }
     * })
     * 
     */
    delete<T extends ObserverDeleteArgs>(args: SelectSubset<T, ObserverDeleteArgs<ExtArgs>>): Prisma__ObserverClient<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Observer.
     * @param {ObserverUpdateArgs} args - Arguments to update one Observer.
     * @example
     * // Update one Observer
     * const observer = await prisma.observer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ObserverUpdateArgs>(args: SelectSubset<T, ObserverUpdateArgs<ExtArgs>>): Prisma__ObserverClient<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Observers.
     * @param {ObserverDeleteManyArgs} args - Arguments to filter Observers to delete.
     * @example
     * // Delete a few Observers
     * const { count } = await prisma.observer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ObserverDeleteManyArgs>(args?: SelectSubset<T, ObserverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Observers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Observers
     * const observer = await prisma.observer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ObserverUpdateManyArgs>(args: SelectSubset<T, ObserverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Observers and returns the data updated in the database.
     * @param {ObserverUpdateManyAndReturnArgs} args - Arguments to update many Observers.
     * @example
     * // Update many Observers
     * const observer = await prisma.observer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Observers and only return the `id`
     * const observerWithIdOnly = await prisma.observer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ObserverUpdateManyAndReturnArgs>(args: SelectSubset<T, ObserverUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Observer.
     * @param {ObserverUpsertArgs} args - Arguments to update or create a Observer.
     * @example
     * // Update or create a Observer
     * const observer = await prisma.observer.upsert({
     *   create: {
     *     // ... data to create a Observer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Observer we want to update
     *   }
     * })
     */
    upsert<T extends ObserverUpsertArgs>(args: SelectSubset<T, ObserverUpsertArgs<ExtArgs>>): Prisma__ObserverClient<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Observers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverCountArgs} args - Arguments to filter Observers to count.
     * @example
     * // Count the number of Observers
     * const count = await prisma.observer.count({
     *   where: {
     *     // ... the filter for the Observers we want to count
     *   }
     * })
    **/
    count<T extends ObserverCountArgs>(
      args?: Subset<T, ObserverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ObserverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Observer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ObserverAggregateArgs>(args: Subset<T, ObserverAggregateArgs>): Prisma.PrismaPromise<GetObserverAggregateType<T>>

    /**
     * Group by Observer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ObserverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ObserverGroupByArgs['orderBy'] }
        : { orderBy?: ObserverGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ObserverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetObserverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Observer model
   */
  readonly fields: ObserverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Observer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ObserverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submissions<T extends Observer$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Observer$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Observer model
   */
  interface ObserverFieldRefs {
    readonly id: FieldRef<"Observer", 'String'>
    readonly email: FieldRef<"Observer", 'String'>
    readonly name: FieldRef<"Observer", 'String'>
    readonly createdAt: FieldRef<"Observer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Observer findUnique
   */
  export type ObserverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
    /**
     * Filter, which Observer to fetch.
     */
    where: ObserverWhereUniqueInput
  }

  /**
   * Observer findUniqueOrThrow
   */
  export type ObserverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
    /**
     * Filter, which Observer to fetch.
     */
    where: ObserverWhereUniqueInput
  }

  /**
   * Observer findFirst
   */
  export type ObserverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
    /**
     * Filter, which Observer to fetch.
     */
    where?: ObserverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observers to fetch.
     */
    orderBy?: ObserverOrderByWithRelationInput | ObserverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Observers.
     */
    cursor?: ObserverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Observers.
     */
    distinct?: ObserverScalarFieldEnum | ObserverScalarFieldEnum[]
  }

  /**
   * Observer findFirstOrThrow
   */
  export type ObserverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
    /**
     * Filter, which Observer to fetch.
     */
    where?: ObserverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observers to fetch.
     */
    orderBy?: ObserverOrderByWithRelationInput | ObserverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Observers.
     */
    cursor?: ObserverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Observers.
     */
    distinct?: ObserverScalarFieldEnum | ObserverScalarFieldEnum[]
  }

  /**
   * Observer findMany
   */
  export type ObserverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
    /**
     * Filter, which Observers to fetch.
     */
    where?: ObserverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observers to fetch.
     */
    orderBy?: ObserverOrderByWithRelationInput | ObserverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Observers.
     */
    cursor?: ObserverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observers.
     */
    skip?: number
    distinct?: ObserverScalarFieldEnum | ObserverScalarFieldEnum[]
  }

  /**
   * Observer create
   */
  export type ObserverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
    /**
     * The data needed to create a Observer.
     */
    data: XOR<ObserverCreateInput, ObserverUncheckedCreateInput>
  }

  /**
   * Observer createMany
   */
  export type ObserverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Observers.
     */
    data: ObserverCreateManyInput | ObserverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Observer createManyAndReturn
   */
  export type ObserverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * The data used to create many Observers.
     */
    data: ObserverCreateManyInput | ObserverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Observer update
   */
  export type ObserverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
    /**
     * The data needed to update a Observer.
     */
    data: XOR<ObserverUpdateInput, ObserverUncheckedUpdateInput>
    /**
     * Choose, which Observer to update.
     */
    where: ObserverWhereUniqueInput
  }

  /**
   * Observer updateMany
   */
  export type ObserverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Observers.
     */
    data: XOR<ObserverUpdateManyMutationInput, ObserverUncheckedUpdateManyInput>
    /**
     * Filter which Observers to update
     */
    where?: ObserverWhereInput
    /**
     * Limit how many Observers to update.
     */
    limit?: number
  }

  /**
   * Observer updateManyAndReturn
   */
  export type ObserverUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * The data used to update Observers.
     */
    data: XOR<ObserverUpdateManyMutationInput, ObserverUncheckedUpdateManyInput>
    /**
     * Filter which Observers to update
     */
    where?: ObserverWhereInput
    /**
     * Limit how many Observers to update.
     */
    limit?: number
  }

  /**
   * Observer upsert
   */
  export type ObserverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
    /**
     * The filter to search for the Observer to update in case it exists.
     */
    where: ObserverWhereUniqueInput
    /**
     * In case the Observer found by the `where` argument doesn't exist, create a new Observer with this data.
     */
    create: XOR<ObserverCreateInput, ObserverUncheckedCreateInput>
    /**
     * In case the Observer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ObserverUpdateInput, ObserverUncheckedUpdateInput>
  }

  /**
   * Observer delete
   */
  export type ObserverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
    /**
     * Filter which Observer to delete.
     */
    where: ObserverWhereUniqueInput
  }

  /**
   * Observer deleteMany
   */
  export type ObserverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Observers to delete
     */
    where?: ObserverWhereInput
    /**
     * Limit how many Observers to delete.
     */
    limit?: number
  }

  /**
   * Observer.submissions
   */
  export type Observer$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    where?: ObserverSubmissionWhereInput
    orderBy?: ObserverSubmissionOrderByWithRelationInput | ObserverSubmissionOrderByWithRelationInput[]
    cursor?: ObserverSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ObserverSubmissionScalarFieldEnum | ObserverSubmissionScalarFieldEnum[]
  }

  /**
   * Observer without action
   */
  export type ObserverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observer
     */
    select?: ObserverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observer
     */
    omit?: ObserverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverInclude<ExtArgs> | null
  }


  /**
   * Model ObserverSubmission
   */

  export type AggregateObserverSubmission = {
    _count: ObserverSubmissionCountAggregateOutputType | null
    _min: ObserverSubmissionMinAggregateOutputType | null
    _max: ObserverSubmissionMaxAggregateOutputType | null
  }

  export type ObserverSubmissionMinAggregateOutputType = {
    id: string | null
    observerId: string | null
    dspId: string | null
    questionResponseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ObserverSubmissionMaxAggregateOutputType = {
    id: string | null
    observerId: string | null
    dspId: string | null
    questionResponseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ObserverSubmissionCountAggregateOutputType = {
    id: number
    observerId: number
    dspId: number
    questionResponseId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ObserverSubmissionMinAggregateInputType = {
    id?: true
    observerId?: true
    dspId?: true
    questionResponseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ObserverSubmissionMaxAggregateInputType = {
    id?: true
    observerId?: true
    dspId?: true
    questionResponseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ObserverSubmissionCountAggregateInputType = {
    id?: true
    observerId?: true
    dspId?: true
    questionResponseId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ObserverSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ObserverSubmission to aggregate.
     */
    where?: ObserverSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ObserverSubmissions to fetch.
     */
    orderBy?: ObserverSubmissionOrderByWithRelationInput | ObserverSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ObserverSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ObserverSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ObserverSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ObserverSubmissions
    **/
    _count?: true | ObserverSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ObserverSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ObserverSubmissionMaxAggregateInputType
  }

  export type GetObserverSubmissionAggregateType<T extends ObserverSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateObserverSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateObserverSubmission[P]>
      : GetScalarType<T[P], AggregateObserverSubmission[P]>
  }




  export type ObserverSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ObserverSubmissionWhereInput
    orderBy?: ObserverSubmissionOrderByWithAggregationInput | ObserverSubmissionOrderByWithAggregationInput[]
    by: ObserverSubmissionScalarFieldEnum[] | ObserverSubmissionScalarFieldEnum
    having?: ObserverSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ObserverSubmissionCountAggregateInputType | true
    _min?: ObserverSubmissionMinAggregateInputType
    _max?: ObserverSubmissionMaxAggregateInputType
  }

  export type ObserverSubmissionGroupByOutputType = {
    id: string
    observerId: string
    dspId: string
    questionResponseId: string
    createdAt: Date
    updatedAt: Date
    _count: ObserverSubmissionCountAggregateOutputType | null
    _min: ObserverSubmissionMinAggregateOutputType | null
    _max: ObserverSubmissionMaxAggregateOutputType | null
  }

  type GetObserverSubmissionGroupByPayload<T extends ObserverSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ObserverSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ObserverSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ObserverSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], ObserverSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type ObserverSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    observerId?: boolean
    dspId?: boolean
    questionResponseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    observer?: boolean | ObserverDefaultArgs<ExtArgs>
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["observerSubmission"]>

  export type ObserverSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    observerId?: boolean
    dspId?: boolean
    questionResponseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    observer?: boolean | ObserverDefaultArgs<ExtArgs>
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["observerSubmission"]>

  export type ObserverSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    observerId?: boolean
    dspId?: boolean
    questionResponseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    observer?: boolean | ObserverDefaultArgs<ExtArgs>
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["observerSubmission"]>

  export type ObserverSubmissionSelectScalar = {
    id?: boolean
    observerId?: boolean
    dspId?: boolean
    questionResponseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ObserverSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "observerId" | "dspId" | "questionResponseId" | "createdAt" | "updatedAt", ExtArgs["result"]["observerSubmission"]>
  export type ObserverSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    observer?: boolean | ObserverDefaultArgs<ExtArgs>
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }
  export type ObserverSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    observer?: boolean | ObserverDefaultArgs<ExtArgs>
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }
  export type ObserverSubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    observer?: boolean | ObserverDefaultArgs<ExtArgs>
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }

  export type $ObserverSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ObserverSubmission"
    objects: {
      observer: Prisma.$ObserverPayload<ExtArgs>
      dsp: Prisma.$DspPayload<ExtArgs>
      questionResponse: Prisma.$QuestionResponsePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      observerId: string
      dspId: string
      questionResponseId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["observerSubmission"]>
    composites: {}
  }

  type ObserverSubmissionGetPayload<S extends boolean | null | undefined | ObserverSubmissionDefaultArgs> = $Result.GetResult<Prisma.$ObserverSubmissionPayload, S>

  type ObserverSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ObserverSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ObserverSubmissionCountAggregateInputType | true
    }

  export interface ObserverSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ObserverSubmission'], meta: { name: 'ObserverSubmission' } }
    /**
     * Find zero or one ObserverSubmission that matches the filter.
     * @param {ObserverSubmissionFindUniqueArgs} args - Arguments to find a ObserverSubmission
     * @example
     * // Get one ObserverSubmission
     * const observerSubmission = await prisma.observerSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ObserverSubmissionFindUniqueArgs>(args: SelectSubset<T, ObserverSubmissionFindUniqueArgs<ExtArgs>>): Prisma__ObserverSubmissionClient<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ObserverSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ObserverSubmissionFindUniqueOrThrowArgs} args - Arguments to find a ObserverSubmission
     * @example
     * // Get one ObserverSubmission
     * const observerSubmission = await prisma.observerSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ObserverSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, ObserverSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ObserverSubmissionClient<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ObserverSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverSubmissionFindFirstArgs} args - Arguments to find a ObserverSubmission
     * @example
     * // Get one ObserverSubmission
     * const observerSubmission = await prisma.observerSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ObserverSubmissionFindFirstArgs>(args?: SelectSubset<T, ObserverSubmissionFindFirstArgs<ExtArgs>>): Prisma__ObserverSubmissionClient<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ObserverSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverSubmissionFindFirstOrThrowArgs} args - Arguments to find a ObserverSubmission
     * @example
     * // Get one ObserverSubmission
     * const observerSubmission = await prisma.observerSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ObserverSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, ObserverSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ObserverSubmissionClient<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ObserverSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ObserverSubmissions
     * const observerSubmissions = await prisma.observerSubmission.findMany()
     * 
     * // Get first 10 ObserverSubmissions
     * const observerSubmissions = await prisma.observerSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const observerSubmissionWithIdOnly = await prisma.observerSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ObserverSubmissionFindManyArgs>(args?: SelectSubset<T, ObserverSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ObserverSubmission.
     * @param {ObserverSubmissionCreateArgs} args - Arguments to create a ObserverSubmission.
     * @example
     * // Create one ObserverSubmission
     * const ObserverSubmission = await prisma.observerSubmission.create({
     *   data: {
     *     // ... data to create a ObserverSubmission
     *   }
     * })
     * 
     */
    create<T extends ObserverSubmissionCreateArgs>(args: SelectSubset<T, ObserverSubmissionCreateArgs<ExtArgs>>): Prisma__ObserverSubmissionClient<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ObserverSubmissions.
     * @param {ObserverSubmissionCreateManyArgs} args - Arguments to create many ObserverSubmissions.
     * @example
     * // Create many ObserverSubmissions
     * const observerSubmission = await prisma.observerSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ObserverSubmissionCreateManyArgs>(args?: SelectSubset<T, ObserverSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ObserverSubmissions and returns the data saved in the database.
     * @param {ObserverSubmissionCreateManyAndReturnArgs} args - Arguments to create many ObserverSubmissions.
     * @example
     * // Create many ObserverSubmissions
     * const observerSubmission = await prisma.observerSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ObserverSubmissions and only return the `id`
     * const observerSubmissionWithIdOnly = await prisma.observerSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ObserverSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, ObserverSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ObserverSubmission.
     * @param {ObserverSubmissionDeleteArgs} args - Arguments to delete one ObserverSubmission.
     * @example
     * // Delete one ObserverSubmission
     * const ObserverSubmission = await prisma.observerSubmission.delete({
     *   where: {
     *     // ... filter to delete one ObserverSubmission
     *   }
     * })
     * 
     */
    delete<T extends ObserverSubmissionDeleteArgs>(args: SelectSubset<T, ObserverSubmissionDeleteArgs<ExtArgs>>): Prisma__ObserverSubmissionClient<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ObserverSubmission.
     * @param {ObserverSubmissionUpdateArgs} args - Arguments to update one ObserverSubmission.
     * @example
     * // Update one ObserverSubmission
     * const observerSubmission = await prisma.observerSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ObserverSubmissionUpdateArgs>(args: SelectSubset<T, ObserverSubmissionUpdateArgs<ExtArgs>>): Prisma__ObserverSubmissionClient<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ObserverSubmissions.
     * @param {ObserverSubmissionDeleteManyArgs} args - Arguments to filter ObserverSubmissions to delete.
     * @example
     * // Delete a few ObserverSubmissions
     * const { count } = await prisma.observerSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ObserverSubmissionDeleteManyArgs>(args?: SelectSubset<T, ObserverSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ObserverSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ObserverSubmissions
     * const observerSubmission = await prisma.observerSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ObserverSubmissionUpdateManyArgs>(args: SelectSubset<T, ObserverSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ObserverSubmissions and returns the data updated in the database.
     * @param {ObserverSubmissionUpdateManyAndReturnArgs} args - Arguments to update many ObserverSubmissions.
     * @example
     * // Update many ObserverSubmissions
     * const observerSubmission = await prisma.observerSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ObserverSubmissions and only return the `id`
     * const observerSubmissionWithIdOnly = await prisma.observerSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ObserverSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, ObserverSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ObserverSubmission.
     * @param {ObserverSubmissionUpsertArgs} args - Arguments to update or create a ObserverSubmission.
     * @example
     * // Update or create a ObserverSubmission
     * const observerSubmission = await prisma.observerSubmission.upsert({
     *   create: {
     *     // ... data to create a ObserverSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ObserverSubmission we want to update
     *   }
     * })
     */
    upsert<T extends ObserverSubmissionUpsertArgs>(args: SelectSubset<T, ObserverSubmissionUpsertArgs<ExtArgs>>): Prisma__ObserverSubmissionClient<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ObserverSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverSubmissionCountArgs} args - Arguments to filter ObserverSubmissions to count.
     * @example
     * // Count the number of ObserverSubmissions
     * const count = await prisma.observerSubmission.count({
     *   where: {
     *     // ... the filter for the ObserverSubmissions we want to count
     *   }
     * })
    **/
    count<T extends ObserverSubmissionCountArgs>(
      args?: Subset<T, ObserverSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ObserverSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ObserverSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ObserverSubmissionAggregateArgs>(args: Subset<T, ObserverSubmissionAggregateArgs>): Prisma.PrismaPromise<GetObserverSubmissionAggregateType<T>>

    /**
     * Group by ObserverSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObserverSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ObserverSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ObserverSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: ObserverSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ObserverSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetObserverSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ObserverSubmission model
   */
  readonly fields: ObserverSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ObserverSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ObserverSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    observer<T extends ObserverDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ObserverDefaultArgs<ExtArgs>>): Prisma__ObserverClient<$Result.GetResult<Prisma.$ObserverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dsp<T extends DspDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DspDefaultArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questionResponse<T extends QuestionResponseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionResponseDefaultArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ObserverSubmission model
   */
  interface ObserverSubmissionFieldRefs {
    readonly id: FieldRef<"ObserverSubmission", 'String'>
    readonly observerId: FieldRef<"ObserverSubmission", 'String'>
    readonly dspId: FieldRef<"ObserverSubmission", 'String'>
    readonly questionResponseId: FieldRef<"ObserverSubmission", 'String'>
    readonly createdAt: FieldRef<"ObserverSubmission", 'DateTime'>
    readonly updatedAt: FieldRef<"ObserverSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ObserverSubmission findUnique
   */
  export type ObserverSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ObserverSubmission to fetch.
     */
    where: ObserverSubmissionWhereUniqueInput
  }

  /**
   * ObserverSubmission findUniqueOrThrow
   */
  export type ObserverSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ObserverSubmission to fetch.
     */
    where: ObserverSubmissionWhereUniqueInput
  }

  /**
   * ObserverSubmission findFirst
   */
  export type ObserverSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ObserverSubmission to fetch.
     */
    where?: ObserverSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ObserverSubmissions to fetch.
     */
    orderBy?: ObserverSubmissionOrderByWithRelationInput | ObserverSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ObserverSubmissions.
     */
    cursor?: ObserverSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ObserverSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ObserverSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ObserverSubmissions.
     */
    distinct?: ObserverSubmissionScalarFieldEnum | ObserverSubmissionScalarFieldEnum[]
  }

  /**
   * ObserverSubmission findFirstOrThrow
   */
  export type ObserverSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ObserverSubmission to fetch.
     */
    where?: ObserverSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ObserverSubmissions to fetch.
     */
    orderBy?: ObserverSubmissionOrderByWithRelationInput | ObserverSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ObserverSubmissions.
     */
    cursor?: ObserverSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ObserverSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ObserverSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ObserverSubmissions.
     */
    distinct?: ObserverSubmissionScalarFieldEnum | ObserverSubmissionScalarFieldEnum[]
  }

  /**
   * ObserverSubmission findMany
   */
  export type ObserverSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ObserverSubmissions to fetch.
     */
    where?: ObserverSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ObserverSubmissions to fetch.
     */
    orderBy?: ObserverSubmissionOrderByWithRelationInput | ObserverSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ObserverSubmissions.
     */
    cursor?: ObserverSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ObserverSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ObserverSubmissions.
     */
    skip?: number
    distinct?: ObserverSubmissionScalarFieldEnum | ObserverSubmissionScalarFieldEnum[]
  }

  /**
   * ObserverSubmission create
   */
  export type ObserverSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a ObserverSubmission.
     */
    data: XOR<ObserverSubmissionCreateInput, ObserverSubmissionUncheckedCreateInput>
  }

  /**
   * ObserverSubmission createMany
   */
  export type ObserverSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ObserverSubmissions.
     */
    data: ObserverSubmissionCreateManyInput | ObserverSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ObserverSubmission createManyAndReturn
   */
  export type ObserverSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many ObserverSubmissions.
     */
    data: ObserverSubmissionCreateManyInput | ObserverSubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ObserverSubmission update
   */
  export type ObserverSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a ObserverSubmission.
     */
    data: XOR<ObserverSubmissionUpdateInput, ObserverSubmissionUncheckedUpdateInput>
    /**
     * Choose, which ObserverSubmission to update.
     */
    where: ObserverSubmissionWhereUniqueInput
  }

  /**
   * ObserverSubmission updateMany
   */
  export type ObserverSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ObserverSubmissions.
     */
    data: XOR<ObserverSubmissionUpdateManyMutationInput, ObserverSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which ObserverSubmissions to update
     */
    where?: ObserverSubmissionWhereInput
    /**
     * Limit how many ObserverSubmissions to update.
     */
    limit?: number
  }

  /**
   * ObserverSubmission updateManyAndReturn
   */
  export type ObserverSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update ObserverSubmissions.
     */
    data: XOR<ObserverSubmissionUpdateManyMutationInput, ObserverSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which ObserverSubmissions to update
     */
    where?: ObserverSubmissionWhereInput
    /**
     * Limit how many ObserverSubmissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ObserverSubmission upsert
   */
  export type ObserverSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the ObserverSubmission to update in case it exists.
     */
    where: ObserverSubmissionWhereUniqueInput
    /**
     * In case the ObserverSubmission found by the `where` argument doesn't exist, create a new ObserverSubmission with this data.
     */
    create: XOR<ObserverSubmissionCreateInput, ObserverSubmissionUncheckedCreateInput>
    /**
     * In case the ObserverSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ObserverSubmissionUpdateInput, ObserverSubmissionUncheckedUpdateInput>
  }

  /**
   * ObserverSubmission delete
   */
  export type ObserverSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    /**
     * Filter which ObserverSubmission to delete.
     */
    where: ObserverSubmissionWhereUniqueInput
  }

  /**
   * ObserverSubmission deleteMany
   */
  export type ObserverSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ObserverSubmissions to delete
     */
    where?: ObserverSubmissionWhereInput
    /**
     * Limit how many ObserverSubmissions to delete.
     */
    limit?: number
  }

  /**
   * ObserverSubmission without action
   */
  export type ObserverSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
  }


  /**
   * Model Dsp
   */

  export type AggregateDsp = {
    _count: DspCountAggregateOutputType | null
    _min: DspMinAggregateOutputType | null
    _max: DspMaxAggregateOutputType | null
  }

  export type DspMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
  }

  export type DspMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
  }

  export type DspCountAggregateOutputType = {
    id: number
    email: number
    name: number
    createdAt: number
    _all: number
  }


  export type DspMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
  }

  export type DspMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
  }

  export type DspCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type DspAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dsp to aggregate.
     */
    where?: DspWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dsps to fetch.
     */
    orderBy?: DspOrderByWithRelationInput | DspOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DspWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dsps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dsps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dsps
    **/
    _count?: true | DspCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DspMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DspMaxAggregateInputType
  }

  export type GetDspAggregateType<T extends DspAggregateArgs> = {
        [P in keyof T & keyof AggregateDsp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDsp[P]>
      : GetScalarType<T[P], AggregateDsp[P]>
  }




  export type DspGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DspWhereInput
    orderBy?: DspOrderByWithAggregationInput | DspOrderByWithAggregationInput[]
    by: DspScalarFieldEnum[] | DspScalarFieldEnum
    having?: DspScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DspCountAggregateInputType | true
    _min?: DspMinAggregateInputType
    _max?: DspMaxAggregateInputType
  }

  export type DspGroupByOutputType = {
    id: string
    email: string
    name: string
    createdAt: Date
    _count: DspCountAggregateOutputType | null
    _min: DspMinAggregateOutputType | null
    _max: DspMaxAggregateOutputType | null
  }

  type GetDspGroupByPayload<T extends DspGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DspGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DspGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DspGroupByOutputType[P]>
            : GetScalarType<T[P], DspGroupByOutputType[P]>
        }
      >
    >


  export type DspSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    observerSubmissions?: boolean | Dsp$observerSubmissionsArgs<ExtArgs>
    selfSubmission?: boolean | Dsp$selfSubmissionArgs<ExtArgs>
    _count?: boolean | DspCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dsp"]>

  export type DspSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dsp"]>

  export type DspSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dsp"]>

  export type DspSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type DspOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "createdAt", ExtArgs["result"]["dsp"]>
  export type DspInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    observerSubmissions?: boolean | Dsp$observerSubmissionsArgs<ExtArgs>
    selfSubmission?: boolean | Dsp$selfSubmissionArgs<ExtArgs>
    _count?: boolean | DspCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DspIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DspIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DspPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dsp"
    objects: {
      observerSubmissions: Prisma.$ObserverSubmissionPayload<ExtArgs>[]
      selfSubmission: Prisma.$DspSubmissionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["dsp"]>
    composites: {}
  }

  type DspGetPayload<S extends boolean | null | undefined | DspDefaultArgs> = $Result.GetResult<Prisma.$DspPayload, S>

  type DspCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DspFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DspCountAggregateInputType | true
    }

  export interface DspDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dsp'], meta: { name: 'Dsp' } }
    /**
     * Find zero or one Dsp that matches the filter.
     * @param {DspFindUniqueArgs} args - Arguments to find a Dsp
     * @example
     * // Get one Dsp
     * const dsp = await prisma.dsp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DspFindUniqueArgs>(args: SelectSubset<T, DspFindUniqueArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dsp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DspFindUniqueOrThrowArgs} args - Arguments to find a Dsp
     * @example
     * // Get one Dsp
     * const dsp = await prisma.dsp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DspFindUniqueOrThrowArgs>(args: SelectSubset<T, DspFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dsp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspFindFirstArgs} args - Arguments to find a Dsp
     * @example
     * // Get one Dsp
     * const dsp = await prisma.dsp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DspFindFirstArgs>(args?: SelectSubset<T, DspFindFirstArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dsp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspFindFirstOrThrowArgs} args - Arguments to find a Dsp
     * @example
     * // Get one Dsp
     * const dsp = await prisma.dsp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DspFindFirstOrThrowArgs>(args?: SelectSubset<T, DspFindFirstOrThrowArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dsps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dsps
     * const dsps = await prisma.dsp.findMany()
     * 
     * // Get first 10 Dsps
     * const dsps = await prisma.dsp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dspWithIdOnly = await prisma.dsp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DspFindManyArgs>(args?: SelectSubset<T, DspFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dsp.
     * @param {DspCreateArgs} args - Arguments to create a Dsp.
     * @example
     * // Create one Dsp
     * const Dsp = await prisma.dsp.create({
     *   data: {
     *     // ... data to create a Dsp
     *   }
     * })
     * 
     */
    create<T extends DspCreateArgs>(args: SelectSubset<T, DspCreateArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dsps.
     * @param {DspCreateManyArgs} args - Arguments to create many Dsps.
     * @example
     * // Create many Dsps
     * const dsp = await prisma.dsp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DspCreateManyArgs>(args?: SelectSubset<T, DspCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dsps and returns the data saved in the database.
     * @param {DspCreateManyAndReturnArgs} args - Arguments to create many Dsps.
     * @example
     * // Create many Dsps
     * const dsp = await prisma.dsp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dsps and only return the `id`
     * const dspWithIdOnly = await prisma.dsp.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DspCreateManyAndReturnArgs>(args?: SelectSubset<T, DspCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dsp.
     * @param {DspDeleteArgs} args - Arguments to delete one Dsp.
     * @example
     * // Delete one Dsp
     * const Dsp = await prisma.dsp.delete({
     *   where: {
     *     // ... filter to delete one Dsp
     *   }
     * })
     * 
     */
    delete<T extends DspDeleteArgs>(args: SelectSubset<T, DspDeleteArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dsp.
     * @param {DspUpdateArgs} args - Arguments to update one Dsp.
     * @example
     * // Update one Dsp
     * const dsp = await prisma.dsp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DspUpdateArgs>(args: SelectSubset<T, DspUpdateArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dsps.
     * @param {DspDeleteManyArgs} args - Arguments to filter Dsps to delete.
     * @example
     * // Delete a few Dsps
     * const { count } = await prisma.dsp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DspDeleteManyArgs>(args?: SelectSubset<T, DspDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dsps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dsps
     * const dsp = await prisma.dsp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DspUpdateManyArgs>(args: SelectSubset<T, DspUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dsps and returns the data updated in the database.
     * @param {DspUpdateManyAndReturnArgs} args - Arguments to update many Dsps.
     * @example
     * // Update many Dsps
     * const dsp = await prisma.dsp.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dsps and only return the `id`
     * const dspWithIdOnly = await prisma.dsp.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DspUpdateManyAndReturnArgs>(args: SelectSubset<T, DspUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dsp.
     * @param {DspUpsertArgs} args - Arguments to update or create a Dsp.
     * @example
     * // Update or create a Dsp
     * const dsp = await prisma.dsp.upsert({
     *   create: {
     *     // ... data to create a Dsp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dsp we want to update
     *   }
     * })
     */
    upsert<T extends DspUpsertArgs>(args: SelectSubset<T, DspUpsertArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dsps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspCountArgs} args - Arguments to filter Dsps to count.
     * @example
     * // Count the number of Dsps
     * const count = await prisma.dsp.count({
     *   where: {
     *     // ... the filter for the Dsps we want to count
     *   }
     * })
    **/
    count<T extends DspCountArgs>(
      args?: Subset<T, DspCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DspCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dsp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DspAggregateArgs>(args: Subset<T, DspAggregateArgs>): Prisma.PrismaPromise<GetDspAggregateType<T>>

    /**
     * Group by Dsp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DspGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DspGroupByArgs['orderBy'] }
        : { orderBy?: DspGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DspGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDspGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dsp model
   */
  readonly fields: DspFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dsp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DspClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    observerSubmissions<T extends Dsp$observerSubmissionsArgs<ExtArgs> = {}>(args?: Subset<T, Dsp$observerSubmissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObserverSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    selfSubmission<T extends Dsp$selfSubmissionArgs<ExtArgs> = {}>(args?: Subset<T, Dsp$selfSubmissionArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dsp model
   */
  interface DspFieldRefs {
    readonly id: FieldRef<"Dsp", 'String'>
    readonly email: FieldRef<"Dsp", 'String'>
    readonly name: FieldRef<"Dsp", 'String'>
    readonly createdAt: FieldRef<"Dsp", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Dsp findUnique
   */
  export type DspFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
    /**
     * Filter, which Dsp to fetch.
     */
    where: DspWhereUniqueInput
  }

  /**
   * Dsp findUniqueOrThrow
   */
  export type DspFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
    /**
     * Filter, which Dsp to fetch.
     */
    where: DspWhereUniqueInput
  }

  /**
   * Dsp findFirst
   */
  export type DspFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
    /**
     * Filter, which Dsp to fetch.
     */
    where?: DspWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dsps to fetch.
     */
    orderBy?: DspOrderByWithRelationInput | DspOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dsps.
     */
    cursor?: DspWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dsps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dsps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dsps.
     */
    distinct?: DspScalarFieldEnum | DspScalarFieldEnum[]
  }

  /**
   * Dsp findFirstOrThrow
   */
  export type DspFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
    /**
     * Filter, which Dsp to fetch.
     */
    where?: DspWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dsps to fetch.
     */
    orderBy?: DspOrderByWithRelationInput | DspOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dsps.
     */
    cursor?: DspWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dsps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dsps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dsps.
     */
    distinct?: DspScalarFieldEnum | DspScalarFieldEnum[]
  }

  /**
   * Dsp findMany
   */
  export type DspFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
    /**
     * Filter, which Dsps to fetch.
     */
    where?: DspWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dsps to fetch.
     */
    orderBy?: DspOrderByWithRelationInput | DspOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dsps.
     */
    cursor?: DspWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dsps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dsps.
     */
    skip?: number
    distinct?: DspScalarFieldEnum | DspScalarFieldEnum[]
  }

  /**
   * Dsp create
   */
  export type DspCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
    /**
     * The data needed to create a Dsp.
     */
    data: XOR<DspCreateInput, DspUncheckedCreateInput>
  }

  /**
   * Dsp createMany
   */
  export type DspCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dsps.
     */
    data: DspCreateManyInput | DspCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dsp createManyAndReturn
   */
  export type DspCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * The data used to create many Dsps.
     */
    data: DspCreateManyInput | DspCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dsp update
   */
  export type DspUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
    /**
     * The data needed to update a Dsp.
     */
    data: XOR<DspUpdateInput, DspUncheckedUpdateInput>
    /**
     * Choose, which Dsp to update.
     */
    where: DspWhereUniqueInput
  }

  /**
   * Dsp updateMany
   */
  export type DspUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dsps.
     */
    data: XOR<DspUpdateManyMutationInput, DspUncheckedUpdateManyInput>
    /**
     * Filter which Dsps to update
     */
    where?: DspWhereInput
    /**
     * Limit how many Dsps to update.
     */
    limit?: number
  }

  /**
   * Dsp updateManyAndReturn
   */
  export type DspUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * The data used to update Dsps.
     */
    data: XOR<DspUpdateManyMutationInput, DspUncheckedUpdateManyInput>
    /**
     * Filter which Dsps to update
     */
    where?: DspWhereInput
    /**
     * Limit how many Dsps to update.
     */
    limit?: number
  }

  /**
   * Dsp upsert
   */
  export type DspUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
    /**
     * The filter to search for the Dsp to update in case it exists.
     */
    where: DspWhereUniqueInput
    /**
     * In case the Dsp found by the `where` argument doesn't exist, create a new Dsp with this data.
     */
    create: XOR<DspCreateInput, DspUncheckedCreateInput>
    /**
     * In case the Dsp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DspUpdateInput, DspUncheckedUpdateInput>
  }

  /**
   * Dsp delete
   */
  export type DspDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
    /**
     * Filter which Dsp to delete.
     */
    where: DspWhereUniqueInput
  }

  /**
   * Dsp deleteMany
   */
  export type DspDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dsps to delete
     */
    where?: DspWhereInput
    /**
     * Limit how many Dsps to delete.
     */
    limit?: number
  }

  /**
   * Dsp.observerSubmissions
   */
  export type Dsp$observerSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObserverSubmission
     */
    select?: ObserverSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ObserverSubmission
     */
    omit?: ObserverSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObserverSubmissionInclude<ExtArgs> | null
    where?: ObserverSubmissionWhereInput
    orderBy?: ObserverSubmissionOrderByWithRelationInput | ObserverSubmissionOrderByWithRelationInput[]
    cursor?: ObserverSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ObserverSubmissionScalarFieldEnum | ObserverSubmissionScalarFieldEnum[]
  }

  /**
   * Dsp.selfSubmission
   */
  export type Dsp$selfSubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    where?: DspSubmissionWhereInput
  }

  /**
   * Dsp without action
   */
  export type DspDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dsp
     */
    select?: DspSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dsp
     */
    omit?: DspOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspInclude<ExtArgs> | null
  }


  /**
   * Model DspSubmission
   */

  export type AggregateDspSubmission = {
    _count: DspSubmissionCountAggregateOutputType | null
    _min: DspSubmissionMinAggregateOutputType | null
    _max: DspSubmissionMaxAggregateOutputType | null
  }

  export type DspSubmissionMinAggregateOutputType = {
    id: string | null
    dspId: string | null
    questionResponseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DspSubmissionMaxAggregateOutputType = {
    id: string | null
    dspId: string | null
    questionResponseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DspSubmissionCountAggregateOutputType = {
    id: number
    dspId: number
    questionResponseId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DspSubmissionMinAggregateInputType = {
    id?: true
    dspId?: true
    questionResponseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DspSubmissionMaxAggregateInputType = {
    id?: true
    dspId?: true
    questionResponseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DspSubmissionCountAggregateInputType = {
    id?: true
    dspId?: true
    questionResponseId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DspSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DspSubmission to aggregate.
     */
    where?: DspSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DspSubmissions to fetch.
     */
    orderBy?: DspSubmissionOrderByWithRelationInput | DspSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DspSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DspSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DspSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DspSubmissions
    **/
    _count?: true | DspSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DspSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DspSubmissionMaxAggregateInputType
  }

  export type GetDspSubmissionAggregateType<T extends DspSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateDspSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDspSubmission[P]>
      : GetScalarType<T[P], AggregateDspSubmission[P]>
  }




  export type DspSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DspSubmissionWhereInput
    orderBy?: DspSubmissionOrderByWithAggregationInput | DspSubmissionOrderByWithAggregationInput[]
    by: DspSubmissionScalarFieldEnum[] | DspSubmissionScalarFieldEnum
    having?: DspSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DspSubmissionCountAggregateInputType | true
    _min?: DspSubmissionMinAggregateInputType
    _max?: DspSubmissionMaxAggregateInputType
  }

  export type DspSubmissionGroupByOutputType = {
    id: string
    dspId: string
    questionResponseId: string
    createdAt: Date
    updatedAt: Date
    _count: DspSubmissionCountAggregateOutputType | null
    _min: DspSubmissionMinAggregateOutputType | null
    _max: DspSubmissionMaxAggregateOutputType | null
  }

  type GetDspSubmissionGroupByPayload<T extends DspSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DspSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DspSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DspSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], DspSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type DspSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dspId?: boolean
    questionResponseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dspSubmission"]>

  export type DspSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dspId?: boolean
    questionResponseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dspSubmission"]>

  export type DspSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dspId?: boolean
    questionResponseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dspSubmission"]>

  export type DspSubmissionSelectScalar = {
    id?: boolean
    dspId?: boolean
    questionResponseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DspSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dspId" | "questionResponseId" | "createdAt" | "updatedAt", ExtArgs["result"]["dspSubmission"]>
  export type DspSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }
  export type DspSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }
  export type DspSubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsp?: boolean | DspDefaultArgs<ExtArgs>
    questionResponse?: boolean | QuestionResponseDefaultArgs<ExtArgs>
  }

  export type $DspSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DspSubmission"
    objects: {
      dsp: Prisma.$DspPayload<ExtArgs>
      questionResponse: Prisma.$QuestionResponsePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dspId: string
      questionResponseId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dspSubmission"]>
    composites: {}
  }

  type DspSubmissionGetPayload<S extends boolean | null | undefined | DspSubmissionDefaultArgs> = $Result.GetResult<Prisma.$DspSubmissionPayload, S>

  type DspSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DspSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DspSubmissionCountAggregateInputType | true
    }

  export interface DspSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DspSubmission'], meta: { name: 'DspSubmission' } }
    /**
     * Find zero or one DspSubmission that matches the filter.
     * @param {DspSubmissionFindUniqueArgs} args - Arguments to find a DspSubmission
     * @example
     * // Get one DspSubmission
     * const dspSubmission = await prisma.dspSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DspSubmissionFindUniqueArgs>(args: SelectSubset<T, DspSubmissionFindUniqueArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DspSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DspSubmissionFindUniqueOrThrowArgs} args - Arguments to find a DspSubmission
     * @example
     * // Get one DspSubmission
     * const dspSubmission = await prisma.dspSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DspSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, DspSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DspSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspSubmissionFindFirstArgs} args - Arguments to find a DspSubmission
     * @example
     * // Get one DspSubmission
     * const dspSubmission = await prisma.dspSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DspSubmissionFindFirstArgs>(args?: SelectSubset<T, DspSubmissionFindFirstArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DspSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspSubmissionFindFirstOrThrowArgs} args - Arguments to find a DspSubmission
     * @example
     * // Get one DspSubmission
     * const dspSubmission = await prisma.dspSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DspSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, DspSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DspSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DspSubmissions
     * const dspSubmissions = await prisma.dspSubmission.findMany()
     * 
     * // Get first 10 DspSubmissions
     * const dspSubmissions = await prisma.dspSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dspSubmissionWithIdOnly = await prisma.dspSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DspSubmissionFindManyArgs>(args?: SelectSubset<T, DspSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DspSubmission.
     * @param {DspSubmissionCreateArgs} args - Arguments to create a DspSubmission.
     * @example
     * // Create one DspSubmission
     * const DspSubmission = await prisma.dspSubmission.create({
     *   data: {
     *     // ... data to create a DspSubmission
     *   }
     * })
     * 
     */
    create<T extends DspSubmissionCreateArgs>(args: SelectSubset<T, DspSubmissionCreateArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DspSubmissions.
     * @param {DspSubmissionCreateManyArgs} args - Arguments to create many DspSubmissions.
     * @example
     * // Create many DspSubmissions
     * const dspSubmission = await prisma.dspSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DspSubmissionCreateManyArgs>(args?: SelectSubset<T, DspSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DspSubmissions and returns the data saved in the database.
     * @param {DspSubmissionCreateManyAndReturnArgs} args - Arguments to create many DspSubmissions.
     * @example
     * // Create many DspSubmissions
     * const dspSubmission = await prisma.dspSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DspSubmissions and only return the `id`
     * const dspSubmissionWithIdOnly = await prisma.dspSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DspSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, DspSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DspSubmission.
     * @param {DspSubmissionDeleteArgs} args - Arguments to delete one DspSubmission.
     * @example
     * // Delete one DspSubmission
     * const DspSubmission = await prisma.dspSubmission.delete({
     *   where: {
     *     // ... filter to delete one DspSubmission
     *   }
     * })
     * 
     */
    delete<T extends DspSubmissionDeleteArgs>(args: SelectSubset<T, DspSubmissionDeleteArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DspSubmission.
     * @param {DspSubmissionUpdateArgs} args - Arguments to update one DspSubmission.
     * @example
     * // Update one DspSubmission
     * const dspSubmission = await prisma.dspSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DspSubmissionUpdateArgs>(args: SelectSubset<T, DspSubmissionUpdateArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DspSubmissions.
     * @param {DspSubmissionDeleteManyArgs} args - Arguments to filter DspSubmissions to delete.
     * @example
     * // Delete a few DspSubmissions
     * const { count } = await prisma.dspSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DspSubmissionDeleteManyArgs>(args?: SelectSubset<T, DspSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DspSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DspSubmissions
     * const dspSubmission = await prisma.dspSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DspSubmissionUpdateManyArgs>(args: SelectSubset<T, DspSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DspSubmissions and returns the data updated in the database.
     * @param {DspSubmissionUpdateManyAndReturnArgs} args - Arguments to update many DspSubmissions.
     * @example
     * // Update many DspSubmissions
     * const dspSubmission = await prisma.dspSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DspSubmissions and only return the `id`
     * const dspSubmissionWithIdOnly = await prisma.dspSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DspSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, DspSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DspSubmission.
     * @param {DspSubmissionUpsertArgs} args - Arguments to update or create a DspSubmission.
     * @example
     * // Update or create a DspSubmission
     * const dspSubmission = await prisma.dspSubmission.upsert({
     *   create: {
     *     // ... data to create a DspSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DspSubmission we want to update
     *   }
     * })
     */
    upsert<T extends DspSubmissionUpsertArgs>(args: SelectSubset<T, DspSubmissionUpsertArgs<ExtArgs>>): Prisma__DspSubmissionClient<$Result.GetResult<Prisma.$DspSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DspSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspSubmissionCountArgs} args - Arguments to filter DspSubmissions to count.
     * @example
     * // Count the number of DspSubmissions
     * const count = await prisma.dspSubmission.count({
     *   where: {
     *     // ... the filter for the DspSubmissions we want to count
     *   }
     * })
    **/
    count<T extends DspSubmissionCountArgs>(
      args?: Subset<T, DspSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DspSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DspSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DspSubmissionAggregateArgs>(args: Subset<T, DspSubmissionAggregateArgs>): Prisma.PrismaPromise<GetDspSubmissionAggregateType<T>>

    /**
     * Group by DspSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DspSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DspSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DspSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: DspSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DspSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDspSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DspSubmission model
   */
  readonly fields: DspSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DspSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DspSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dsp<T extends DspDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DspDefaultArgs<ExtArgs>>): Prisma__DspClient<$Result.GetResult<Prisma.$DspPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questionResponse<T extends QuestionResponseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionResponseDefaultArgs<ExtArgs>>): Prisma__QuestionResponseClient<$Result.GetResult<Prisma.$QuestionResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DspSubmission model
   */
  interface DspSubmissionFieldRefs {
    readonly id: FieldRef<"DspSubmission", 'String'>
    readonly dspId: FieldRef<"DspSubmission", 'String'>
    readonly questionResponseId: FieldRef<"DspSubmission", 'String'>
    readonly createdAt: FieldRef<"DspSubmission", 'DateTime'>
    readonly updatedAt: FieldRef<"DspSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DspSubmission findUnique
   */
  export type DspSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which DspSubmission to fetch.
     */
    where: DspSubmissionWhereUniqueInput
  }

  /**
   * DspSubmission findUniqueOrThrow
   */
  export type DspSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which DspSubmission to fetch.
     */
    where: DspSubmissionWhereUniqueInput
  }

  /**
   * DspSubmission findFirst
   */
  export type DspSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which DspSubmission to fetch.
     */
    where?: DspSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DspSubmissions to fetch.
     */
    orderBy?: DspSubmissionOrderByWithRelationInput | DspSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DspSubmissions.
     */
    cursor?: DspSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DspSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DspSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DspSubmissions.
     */
    distinct?: DspSubmissionScalarFieldEnum | DspSubmissionScalarFieldEnum[]
  }

  /**
   * DspSubmission findFirstOrThrow
   */
  export type DspSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which DspSubmission to fetch.
     */
    where?: DspSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DspSubmissions to fetch.
     */
    orderBy?: DspSubmissionOrderByWithRelationInput | DspSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DspSubmissions.
     */
    cursor?: DspSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DspSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DspSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DspSubmissions.
     */
    distinct?: DspSubmissionScalarFieldEnum | DspSubmissionScalarFieldEnum[]
  }

  /**
   * DspSubmission findMany
   */
  export type DspSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which DspSubmissions to fetch.
     */
    where?: DspSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DspSubmissions to fetch.
     */
    orderBy?: DspSubmissionOrderByWithRelationInput | DspSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DspSubmissions.
     */
    cursor?: DspSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DspSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DspSubmissions.
     */
    skip?: number
    distinct?: DspSubmissionScalarFieldEnum | DspSubmissionScalarFieldEnum[]
  }

  /**
   * DspSubmission create
   */
  export type DspSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a DspSubmission.
     */
    data: XOR<DspSubmissionCreateInput, DspSubmissionUncheckedCreateInput>
  }

  /**
   * DspSubmission createMany
   */
  export type DspSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DspSubmissions.
     */
    data: DspSubmissionCreateManyInput | DspSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DspSubmission createManyAndReturn
   */
  export type DspSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many DspSubmissions.
     */
    data: DspSubmissionCreateManyInput | DspSubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DspSubmission update
   */
  export type DspSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a DspSubmission.
     */
    data: XOR<DspSubmissionUpdateInput, DspSubmissionUncheckedUpdateInput>
    /**
     * Choose, which DspSubmission to update.
     */
    where: DspSubmissionWhereUniqueInput
  }

  /**
   * DspSubmission updateMany
   */
  export type DspSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DspSubmissions.
     */
    data: XOR<DspSubmissionUpdateManyMutationInput, DspSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which DspSubmissions to update
     */
    where?: DspSubmissionWhereInput
    /**
     * Limit how many DspSubmissions to update.
     */
    limit?: number
  }

  /**
   * DspSubmission updateManyAndReturn
   */
  export type DspSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update DspSubmissions.
     */
    data: XOR<DspSubmissionUpdateManyMutationInput, DspSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which DspSubmissions to update
     */
    where?: DspSubmissionWhereInput
    /**
     * Limit how many DspSubmissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DspSubmission upsert
   */
  export type DspSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the DspSubmission to update in case it exists.
     */
    where: DspSubmissionWhereUniqueInput
    /**
     * In case the DspSubmission found by the `where` argument doesn't exist, create a new DspSubmission with this data.
     */
    create: XOR<DspSubmissionCreateInput, DspSubmissionUncheckedCreateInput>
    /**
     * In case the DspSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DspSubmissionUpdateInput, DspSubmissionUncheckedUpdateInput>
  }

  /**
   * DspSubmission delete
   */
  export type DspSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
    /**
     * Filter which DspSubmission to delete.
     */
    where: DspSubmissionWhereUniqueInput
  }

  /**
   * DspSubmission deleteMany
   */
  export type DspSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DspSubmissions to delete
     */
    where?: DspSubmissionWhereInput
    /**
     * Limit how many DspSubmissions to delete.
     */
    limit?: number
  }

  /**
   * DspSubmission without action
   */
  export type DspSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DspSubmission
     */
    select?: DspSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DspSubmission
     */
    omit?: DspSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DspSubmissionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const QuestionResponseScalarFieldEnum: {
    id: 'id',
    q1: 'q1',
    q2: 'q2',
    q3: 'q3',
    q4: 'q4',
    q5: 'q5',
    q6: 'q6',
    q7: 'q7',
    q8: 'q8',
    q9: 'q9',
    q10: 'q10',
    q11: 'q11',
    q12: 'q12',
    q13: 'q13',
    q14: 'q14',
    q15: 'q15',
    q16: 'q16',
    q17: 'q17',
    q18: 'q18',
    q19: 'q19',
    q20: 'q20',
    q21: 'q21',
    q22: 'q22',
    q23: 'q23',
    q24: 'q24',
    q25: 'q25',
    q26: 'q26',
    q27: 'q27',
    q28: 'q28',
    q29: 'q29',
    q30: 'q30',
    q31: 'q31',
    q32: 'q32',
    q33: 'q33',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuestionResponseScalarFieldEnum = (typeof QuestionResponseScalarFieldEnum)[keyof typeof QuestionResponseScalarFieldEnum]


  export const ObserverScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type ObserverScalarFieldEnum = (typeof ObserverScalarFieldEnum)[keyof typeof ObserverScalarFieldEnum]


  export const ObserverSubmissionScalarFieldEnum: {
    id: 'id',
    observerId: 'observerId',
    dspId: 'dspId',
    questionResponseId: 'questionResponseId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ObserverSubmissionScalarFieldEnum = (typeof ObserverSubmissionScalarFieldEnum)[keyof typeof ObserverSubmissionScalarFieldEnum]


  export const DspScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type DspScalarFieldEnum = (typeof DspScalarFieldEnum)[keyof typeof DspScalarFieldEnum]


  export const DspSubmissionScalarFieldEnum: {
    id: 'id',
    dspId: 'dspId',
    questionResponseId: 'questionResponseId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DspSubmissionScalarFieldEnum = (typeof DspSubmissionScalarFieldEnum)[keyof typeof DspSubmissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type QuestionResponseWhereInput = {
    AND?: QuestionResponseWhereInput | QuestionResponseWhereInput[]
    OR?: QuestionResponseWhereInput[]
    NOT?: QuestionResponseWhereInput | QuestionResponseWhereInput[]
    id?: StringFilter<"QuestionResponse"> | string
    q1?: IntNullableFilter<"QuestionResponse"> | number | null
    q2?: IntNullableFilter<"QuestionResponse"> | number | null
    q3?: IntNullableFilter<"QuestionResponse"> | number | null
    q4?: IntNullableFilter<"QuestionResponse"> | number | null
    q5?: IntNullableFilter<"QuestionResponse"> | number | null
    q6?: IntNullableFilter<"QuestionResponse"> | number | null
    q7?: IntNullableFilter<"QuestionResponse"> | number | null
    q8?: IntNullableFilter<"QuestionResponse"> | number | null
    q9?: IntNullableFilter<"QuestionResponse"> | number | null
    q10?: IntNullableFilter<"QuestionResponse"> | number | null
    q11?: IntNullableFilter<"QuestionResponse"> | number | null
    q12?: IntNullableFilter<"QuestionResponse"> | number | null
    q13?: IntNullableFilter<"QuestionResponse"> | number | null
    q14?: IntNullableFilter<"QuestionResponse"> | number | null
    q15?: IntNullableFilter<"QuestionResponse"> | number | null
    q16?: IntNullableFilter<"QuestionResponse"> | number | null
    q17?: IntNullableFilter<"QuestionResponse"> | number | null
    q18?: IntNullableFilter<"QuestionResponse"> | number | null
    q19?: IntNullableFilter<"QuestionResponse"> | number | null
    q20?: IntNullableFilter<"QuestionResponse"> | number | null
    q21?: IntNullableFilter<"QuestionResponse"> | number | null
    q22?: IntNullableFilter<"QuestionResponse"> | number | null
    q23?: IntNullableFilter<"QuestionResponse"> | number | null
    q24?: IntNullableFilter<"QuestionResponse"> | number | null
    q25?: IntNullableFilter<"QuestionResponse"> | number | null
    q26?: IntNullableFilter<"QuestionResponse"> | number | null
    q27?: IntNullableFilter<"QuestionResponse"> | number | null
    q28?: IntNullableFilter<"QuestionResponse"> | number | null
    q29?: IntNullableFilter<"QuestionResponse"> | number | null
    q30?: IntNullableFilter<"QuestionResponse"> | number | null
    q31?: IntNullableFilter<"QuestionResponse"> | number | null
    q32?: IntNullableFilter<"QuestionResponse"> | number | null
    q33?: IntNullableFilter<"QuestionResponse"> | number | null
    createdAt?: DateTimeFilter<"QuestionResponse"> | Date | string
    updatedAt?: DateTimeFilter<"QuestionResponse"> | Date | string
    observerSubmission?: XOR<ObserverSubmissionNullableScalarRelationFilter, ObserverSubmissionWhereInput> | null
    dspSubmission?: XOR<DspSubmissionNullableScalarRelationFilter, DspSubmissionWhereInput> | null
  }

  export type QuestionResponseOrderByWithRelationInput = {
    id?: SortOrder
    q1?: SortOrderInput | SortOrder
    q2?: SortOrderInput | SortOrder
    q3?: SortOrderInput | SortOrder
    q4?: SortOrderInput | SortOrder
    q5?: SortOrderInput | SortOrder
    q6?: SortOrderInput | SortOrder
    q7?: SortOrderInput | SortOrder
    q8?: SortOrderInput | SortOrder
    q9?: SortOrderInput | SortOrder
    q10?: SortOrderInput | SortOrder
    q11?: SortOrderInput | SortOrder
    q12?: SortOrderInput | SortOrder
    q13?: SortOrderInput | SortOrder
    q14?: SortOrderInput | SortOrder
    q15?: SortOrderInput | SortOrder
    q16?: SortOrderInput | SortOrder
    q17?: SortOrderInput | SortOrder
    q18?: SortOrderInput | SortOrder
    q19?: SortOrderInput | SortOrder
    q20?: SortOrderInput | SortOrder
    q21?: SortOrderInput | SortOrder
    q22?: SortOrderInput | SortOrder
    q23?: SortOrderInput | SortOrder
    q24?: SortOrderInput | SortOrder
    q25?: SortOrderInput | SortOrder
    q26?: SortOrderInput | SortOrder
    q27?: SortOrderInput | SortOrder
    q28?: SortOrderInput | SortOrder
    q29?: SortOrderInput | SortOrder
    q30?: SortOrderInput | SortOrder
    q31?: SortOrderInput | SortOrder
    q32?: SortOrderInput | SortOrder
    q33?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    observerSubmission?: ObserverSubmissionOrderByWithRelationInput
    dspSubmission?: DspSubmissionOrderByWithRelationInput
  }

  export type QuestionResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionResponseWhereInput | QuestionResponseWhereInput[]
    OR?: QuestionResponseWhereInput[]
    NOT?: QuestionResponseWhereInput | QuestionResponseWhereInput[]
    q1?: IntNullableFilter<"QuestionResponse"> | number | null
    q2?: IntNullableFilter<"QuestionResponse"> | number | null
    q3?: IntNullableFilter<"QuestionResponse"> | number | null
    q4?: IntNullableFilter<"QuestionResponse"> | number | null
    q5?: IntNullableFilter<"QuestionResponse"> | number | null
    q6?: IntNullableFilter<"QuestionResponse"> | number | null
    q7?: IntNullableFilter<"QuestionResponse"> | number | null
    q8?: IntNullableFilter<"QuestionResponse"> | number | null
    q9?: IntNullableFilter<"QuestionResponse"> | number | null
    q10?: IntNullableFilter<"QuestionResponse"> | number | null
    q11?: IntNullableFilter<"QuestionResponse"> | number | null
    q12?: IntNullableFilter<"QuestionResponse"> | number | null
    q13?: IntNullableFilter<"QuestionResponse"> | number | null
    q14?: IntNullableFilter<"QuestionResponse"> | number | null
    q15?: IntNullableFilter<"QuestionResponse"> | number | null
    q16?: IntNullableFilter<"QuestionResponse"> | number | null
    q17?: IntNullableFilter<"QuestionResponse"> | number | null
    q18?: IntNullableFilter<"QuestionResponse"> | number | null
    q19?: IntNullableFilter<"QuestionResponse"> | number | null
    q20?: IntNullableFilter<"QuestionResponse"> | number | null
    q21?: IntNullableFilter<"QuestionResponse"> | number | null
    q22?: IntNullableFilter<"QuestionResponse"> | number | null
    q23?: IntNullableFilter<"QuestionResponse"> | number | null
    q24?: IntNullableFilter<"QuestionResponse"> | number | null
    q25?: IntNullableFilter<"QuestionResponse"> | number | null
    q26?: IntNullableFilter<"QuestionResponse"> | number | null
    q27?: IntNullableFilter<"QuestionResponse"> | number | null
    q28?: IntNullableFilter<"QuestionResponse"> | number | null
    q29?: IntNullableFilter<"QuestionResponse"> | number | null
    q30?: IntNullableFilter<"QuestionResponse"> | number | null
    q31?: IntNullableFilter<"QuestionResponse"> | number | null
    q32?: IntNullableFilter<"QuestionResponse"> | number | null
    q33?: IntNullableFilter<"QuestionResponse"> | number | null
    createdAt?: DateTimeFilter<"QuestionResponse"> | Date | string
    updatedAt?: DateTimeFilter<"QuestionResponse"> | Date | string
    observerSubmission?: XOR<ObserverSubmissionNullableScalarRelationFilter, ObserverSubmissionWhereInput> | null
    dspSubmission?: XOR<DspSubmissionNullableScalarRelationFilter, DspSubmissionWhereInput> | null
  }, "id">

  export type QuestionResponseOrderByWithAggregationInput = {
    id?: SortOrder
    q1?: SortOrderInput | SortOrder
    q2?: SortOrderInput | SortOrder
    q3?: SortOrderInput | SortOrder
    q4?: SortOrderInput | SortOrder
    q5?: SortOrderInput | SortOrder
    q6?: SortOrderInput | SortOrder
    q7?: SortOrderInput | SortOrder
    q8?: SortOrderInput | SortOrder
    q9?: SortOrderInput | SortOrder
    q10?: SortOrderInput | SortOrder
    q11?: SortOrderInput | SortOrder
    q12?: SortOrderInput | SortOrder
    q13?: SortOrderInput | SortOrder
    q14?: SortOrderInput | SortOrder
    q15?: SortOrderInput | SortOrder
    q16?: SortOrderInput | SortOrder
    q17?: SortOrderInput | SortOrder
    q18?: SortOrderInput | SortOrder
    q19?: SortOrderInput | SortOrder
    q20?: SortOrderInput | SortOrder
    q21?: SortOrderInput | SortOrder
    q22?: SortOrderInput | SortOrder
    q23?: SortOrderInput | SortOrder
    q24?: SortOrderInput | SortOrder
    q25?: SortOrderInput | SortOrder
    q26?: SortOrderInput | SortOrder
    q27?: SortOrderInput | SortOrder
    q28?: SortOrderInput | SortOrder
    q29?: SortOrderInput | SortOrder
    q30?: SortOrderInput | SortOrder
    q31?: SortOrderInput | SortOrder
    q32?: SortOrderInput | SortOrder
    q33?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuestionResponseCountOrderByAggregateInput
    _avg?: QuestionResponseAvgOrderByAggregateInput
    _max?: QuestionResponseMaxOrderByAggregateInput
    _min?: QuestionResponseMinOrderByAggregateInput
    _sum?: QuestionResponseSumOrderByAggregateInput
  }

  export type QuestionResponseScalarWhereWithAggregatesInput = {
    AND?: QuestionResponseScalarWhereWithAggregatesInput | QuestionResponseScalarWhereWithAggregatesInput[]
    OR?: QuestionResponseScalarWhereWithAggregatesInput[]
    NOT?: QuestionResponseScalarWhereWithAggregatesInput | QuestionResponseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuestionResponse"> | string
    q1?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q2?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q3?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q4?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q5?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q6?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q7?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q8?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q9?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q10?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q11?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q12?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q13?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q14?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q15?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q16?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q17?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q18?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q19?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q20?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q21?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q22?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q23?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q24?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q25?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q26?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q27?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q28?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q29?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q30?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q31?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q32?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    q33?: IntNullableWithAggregatesFilter<"QuestionResponse"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"QuestionResponse"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QuestionResponse"> | Date | string
  }

  export type ObserverWhereInput = {
    AND?: ObserverWhereInput | ObserverWhereInput[]
    OR?: ObserverWhereInput[]
    NOT?: ObserverWhereInput | ObserverWhereInput[]
    id?: StringFilter<"Observer"> | string
    email?: StringFilter<"Observer"> | string
    name?: StringFilter<"Observer"> | string
    createdAt?: DateTimeFilter<"Observer"> | Date | string
    submissions?: ObserverSubmissionListRelationFilter
  }

  export type ObserverOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    submissions?: ObserverSubmissionOrderByRelationAggregateInput
  }

  export type ObserverWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ObserverWhereInput | ObserverWhereInput[]
    OR?: ObserverWhereInput[]
    NOT?: ObserverWhereInput | ObserverWhereInput[]
    name?: StringFilter<"Observer"> | string
    createdAt?: DateTimeFilter<"Observer"> | Date | string
    submissions?: ObserverSubmissionListRelationFilter
  }, "id" | "email">

  export type ObserverOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: ObserverCountOrderByAggregateInput
    _max?: ObserverMaxOrderByAggregateInput
    _min?: ObserverMinOrderByAggregateInput
  }

  export type ObserverScalarWhereWithAggregatesInput = {
    AND?: ObserverScalarWhereWithAggregatesInput | ObserverScalarWhereWithAggregatesInput[]
    OR?: ObserverScalarWhereWithAggregatesInput[]
    NOT?: ObserverScalarWhereWithAggregatesInput | ObserverScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Observer"> | string
    email?: StringWithAggregatesFilter<"Observer"> | string
    name?: StringWithAggregatesFilter<"Observer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Observer"> | Date | string
  }

  export type ObserverSubmissionWhereInput = {
    AND?: ObserverSubmissionWhereInput | ObserverSubmissionWhereInput[]
    OR?: ObserverSubmissionWhereInput[]
    NOT?: ObserverSubmissionWhereInput | ObserverSubmissionWhereInput[]
    id?: StringFilter<"ObserverSubmission"> | string
    observerId?: StringFilter<"ObserverSubmission"> | string
    dspId?: StringFilter<"ObserverSubmission"> | string
    questionResponseId?: StringFilter<"ObserverSubmission"> | string
    createdAt?: DateTimeFilter<"ObserverSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"ObserverSubmission"> | Date | string
    observer?: XOR<ObserverScalarRelationFilter, ObserverWhereInput>
    dsp?: XOR<DspScalarRelationFilter, DspWhereInput>
    questionResponse?: XOR<QuestionResponseScalarRelationFilter, QuestionResponseWhereInput>
  }

  export type ObserverSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    observerId?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    observer?: ObserverOrderByWithRelationInput
    dsp?: DspOrderByWithRelationInput
    questionResponse?: QuestionResponseOrderByWithRelationInput
  }

  export type ObserverSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    questionResponseId?: string
    observerId_dspId?: ObserverSubmissionObserverIdDspIdCompoundUniqueInput
    AND?: ObserverSubmissionWhereInput | ObserverSubmissionWhereInput[]
    OR?: ObserverSubmissionWhereInput[]
    NOT?: ObserverSubmissionWhereInput | ObserverSubmissionWhereInput[]
    observerId?: StringFilter<"ObserverSubmission"> | string
    dspId?: StringFilter<"ObserverSubmission"> | string
    createdAt?: DateTimeFilter<"ObserverSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"ObserverSubmission"> | Date | string
    observer?: XOR<ObserverScalarRelationFilter, ObserverWhereInput>
    dsp?: XOR<DspScalarRelationFilter, DspWhereInput>
    questionResponse?: XOR<QuestionResponseScalarRelationFilter, QuestionResponseWhereInput>
  }, "id" | "questionResponseId" | "observerId_dspId">

  export type ObserverSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    observerId?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ObserverSubmissionCountOrderByAggregateInput
    _max?: ObserverSubmissionMaxOrderByAggregateInput
    _min?: ObserverSubmissionMinOrderByAggregateInput
  }

  export type ObserverSubmissionScalarWhereWithAggregatesInput = {
    AND?: ObserverSubmissionScalarWhereWithAggregatesInput | ObserverSubmissionScalarWhereWithAggregatesInput[]
    OR?: ObserverSubmissionScalarWhereWithAggregatesInput[]
    NOT?: ObserverSubmissionScalarWhereWithAggregatesInput | ObserverSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ObserverSubmission"> | string
    observerId?: StringWithAggregatesFilter<"ObserverSubmission"> | string
    dspId?: StringWithAggregatesFilter<"ObserverSubmission"> | string
    questionResponseId?: StringWithAggregatesFilter<"ObserverSubmission"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ObserverSubmission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ObserverSubmission"> | Date | string
  }

  export type DspWhereInput = {
    AND?: DspWhereInput | DspWhereInput[]
    OR?: DspWhereInput[]
    NOT?: DspWhereInput | DspWhereInput[]
    id?: StringFilter<"Dsp"> | string
    email?: StringFilter<"Dsp"> | string
    name?: StringFilter<"Dsp"> | string
    createdAt?: DateTimeFilter<"Dsp"> | Date | string
    observerSubmissions?: ObserverSubmissionListRelationFilter
    selfSubmission?: XOR<DspSubmissionNullableScalarRelationFilter, DspSubmissionWhereInput> | null
  }

  export type DspOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    observerSubmissions?: ObserverSubmissionOrderByRelationAggregateInput
    selfSubmission?: DspSubmissionOrderByWithRelationInput
  }

  export type DspWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: DspWhereInput | DspWhereInput[]
    OR?: DspWhereInput[]
    NOT?: DspWhereInput | DspWhereInput[]
    name?: StringFilter<"Dsp"> | string
    createdAt?: DateTimeFilter<"Dsp"> | Date | string
    observerSubmissions?: ObserverSubmissionListRelationFilter
    selfSubmission?: XOR<DspSubmissionNullableScalarRelationFilter, DspSubmissionWhereInput> | null
  }, "id" | "email">

  export type DspOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: DspCountOrderByAggregateInput
    _max?: DspMaxOrderByAggregateInput
    _min?: DspMinOrderByAggregateInput
  }

  export type DspScalarWhereWithAggregatesInput = {
    AND?: DspScalarWhereWithAggregatesInput | DspScalarWhereWithAggregatesInput[]
    OR?: DspScalarWhereWithAggregatesInput[]
    NOT?: DspScalarWhereWithAggregatesInput | DspScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dsp"> | string
    email?: StringWithAggregatesFilter<"Dsp"> | string
    name?: StringWithAggregatesFilter<"Dsp"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Dsp"> | Date | string
  }

  export type DspSubmissionWhereInput = {
    AND?: DspSubmissionWhereInput | DspSubmissionWhereInput[]
    OR?: DspSubmissionWhereInput[]
    NOT?: DspSubmissionWhereInput | DspSubmissionWhereInput[]
    id?: StringFilter<"DspSubmission"> | string
    dspId?: StringFilter<"DspSubmission"> | string
    questionResponseId?: StringFilter<"DspSubmission"> | string
    createdAt?: DateTimeFilter<"DspSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"DspSubmission"> | Date | string
    dsp?: XOR<DspScalarRelationFilter, DspWhereInput>
    questionResponse?: XOR<QuestionResponseScalarRelationFilter, QuestionResponseWhereInput>
  }

  export type DspSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dsp?: DspOrderByWithRelationInput
    questionResponse?: QuestionResponseOrderByWithRelationInput
  }

  export type DspSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dspId?: string
    questionResponseId?: string
    AND?: DspSubmissionWhereInput | DspSubmissionWhereInput[]
    OR?: DspSubmissionWhereInput[]
    NOT?: DspSubmissionWhereInput | DspSubmissionWhereInput[]
    createdAt?: DateTimeFilter<"DspSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"DspSubmission"> | Date | string
    dsp?: XOR<DspScalarRelationFilter, DspWhereInput>
    questionResponse?: XOR<QuestionResponseScalarRelationFilter, QuestionResponseWhereInput>
  }, "id" | "dspId" | "questionResponseId">

  export type DspSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DspSubmissionCountOrderByAggregateInput
    _max?: DspSubmissionMaxOrderByAggregateInput
    _min?: DspSubmissionMinOrderByAggregateInput
  }

  export type DspSubmissionScalarWhereWithAggregatesInput = {
    AND?: DspSubmissionScalarWhereWithAggregatesInput | DspSubmissionScalarWhereWithAggregatesInput[]
    OR?: DspSubmissionScalarWhereWithAggregatesInput[]
    NOT?: DspSubmissionScalarWhereWithAggregatesInput | DspSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DspSubmission"> | string
    dspId?: StringWithAggregatesFilter<"DspSubmission"> | string
    questionResponseId?: StringWithAggregatesFilter<"DspSubmission"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DspSubmission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DspSubmission"> | Date | string
  }

  export type QuestionResponseCreateInput = {
    id?: string
    q1?: number | null
    q2?: number | null
    q3?: number | null
    q4?: number | null
    q5?: number | null
    q6?: number | null
    q7?: number | null
    q8?: number | null
    q9?: number | null
    q10?: number | null
    q11?: number | null
    q12?: number | null
    q13?: number | null
    q14?: number | null
    q15?: number | null
    q16?: number | null
    q17?: number | null
    q18?: number | null
    q19?: number | null
    q20?: number | null
    q21?: number | null
    q22?: number | null
    q23?: number | null
    q24?: number | null
    q25?: number | null
    q26?: number | null
    q27?: number | null
    q28?: number | null
    q29?: number | null
    q30?: number | null
    q31?: number | null
    q32?: number | null
    q33?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    observerSubmission?: ObserverSubmissionCreateNestedOneWithoutQuestionResponseInput
    dspSubmission?: DspSubmissionCreateNestedOneWithoutQuestionResponseInput
  }

  export type QuestionResponseUncheckedCreateInput = {
    id?: string
    q1?: number | null
    q2?: number | null
    q3?: number | null
    q4?: number | null
    q5?: number | null
    q6?: number | null
    q7?: number | null
    q8?: number | null
    q9?: number | null
    q10?: number | null
    q11?: number | null
    q12?: number | null
    q13?: number | null
    q14?: number | null
    q15?: number | null
    q16?: number | null
    q17?: number | null
    q18?: number | null
    q19?: number | null
    q20?: number | null
    q21?: number | null
    q22?: number | null
    q23?: number | null
    q24?: number | null
    q25?: number | null
    q26?: number | null
    q27?: number | null
    q28?: number | null
    q29?: number | null
    q30?: number | null
    q31?: number | null
    q32?: number | null
    q33?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    observerSubmission?: ObserverSubmissionUncheckedCreateNestedOneWithoutQuestionResponseInput
    dspSubmission?: DspSubmissionUncheckedCreateNestedOneWithoutQuestionResponseInput
  }

  export type QuestionResponseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    q1?: NullableIntFieldUpdateOperationsInput | number | null
    q2?: NullableIntFieldUpdateOperationsInput | number | null
    q3?: NullableIntFieldUpdateOperationsInput | number | null
    q4?: NullableIntFieldUpdateOperationsInput | number | null
    q5?: NullableIntFieldUpdateOperationsInput | number | null
    q6?: NullableIntFieldUpdateOperationsInput | number | null
    q7?: NullableIntFieldUpdateOperationsInput | number | null
    q8?: NullableIntFieldUpdateOperationsInput | number | null
    q9?: NullableIntFieldUpdateOperationsInput | number | null
    q10?: NullableIntFieldUpdateOperationsInput | number | null
    q11?: NullableIntFieldUpdateOperationsInput | number | null
    q12?: NullableIntFieldUpdateOperationsInput | number | null
    q13?: NullableIntFieldUpdateOperationsInput | number | null
    q14?: NullableIntFieldUpdateOperationsInput | number | null
    q15?: NullableIntFieldUpdateOperationsInput | number | null
    q16?: NullableIntFieldUpdateOperationsInput | number | null
    q17?: NullableIntFieldUpdateOperationsInput | number | null
    q18?: NullableIntFieldUpdateOperationsInput | number | null
    q19?: NullableIntFieldUpdateOperationsInput | number | null
    q20?: NullableIntFieldUpdateOperationsInput | number | null
    q21?: NullableIntFieldUpdateOperationsInput | number | null
    q22?: NullableIntFieldUpdateOperationsInput | number | null
    q23?: NullableIntFieldUpdateOperationsInput | number | null
    q24?: NullableIntFieldUpdateOperationsInput | number | null
    q25?: NullableIntFieldUpdateOperationsInput | number | null
    q26?: NullableIntFieldUpdateOperationsInput | number | null
    q27?: NullableIntFieldUpdateOperationsInput | number | null
    q28?: NullableIntFieldUpdateOperationsInput | number | null
    q29?: NullableIntFieldUpdateOperationsInput | number | null
    q30?: NullableIntFieldUpdateOperationsInput | number | null
    q31?: NullableIntFieldUpdateOperationsInput | number | null
    q32?: NullableIntFieldUpdateOperationsInput | number | null
    q33?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observerSubmission?: ObserverSubmissionUpdateOneWithoutQuestionResponseNestedInput
    dspSubmission?: DspSubmissionUpdateOneWithoutQuestionResponseNestedInput
  }

  export type QuestionResponseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    q1?: NullableIntFieldUpdateOperationsInput | number | null
    q2?: NullableIntFieldUpdateOperationsInput | number | null
    q3?: NullableIntFieldUpdateOperationsInput | number | null
    q4?: NullableIntFieldUpdateOperationsInput | number | null
    q5?: NullableIntFieldUpdateOperationsInput | number | null
    q6?: NullableIntFieldUpdateOperationsInput | number | null
    q7?: NullableIntFieldUpdateOperationsInput | number | null
    q8?: NullableIntFieldUpdateOperationsInput | number | null
    q9?: NullableIntFieldUpdateOperationsInput | number | null
    q10?: NullableIntFieldUpdateOperationsInput | number | null
    q11?: NullableIntFieldUpdateOperationsInput | number | null
    q12?: NullableIntFieldUpdateOperationsInput | number | null
    q13?: NullableIntFieldUpdateOperationsInput | number | null
    q14?: NullableIntFieldUpdateOperationsInput | number | null
    q15?: NullableIntFieldUpdateOperationsInput | number | null
    q16?: NullableIntFieldUpdateOperationsInput | number | null
    q17?: NullableIntFieldUpdateOperationsInput | number | null
    q18?: NullableIntFieldUpdateOperationsInput | number | null
    q19?: NullableIntFieldUpdateOperationsInput | number | null
    q20?: NullableIntFieldUpdateOperationsInput | number | null
    q21?: NullableIntFieldUpdateOperationsInput | number | null
    q22?: NullableIntFieldUpdateOperationsInput | number | null
    q23?: NullableIntFieldUpdateOperationsInput | number | null
    q24?: NullableIntFieldUpdateOperationsInput | number | null
    q25?: NullableIntFieldUpdateOperationsInput | number | null
    q26?: NullableIntFieldUpdateOperationsInput | number | null
    q27?: NullableIntFieldUpdateOperationsInput | number | null
    q28?: NullableIntFieldUpdateOperationsInput | number | null
    q29?: NullableIntFieldUpdateOperationsInput | number | null
    q30?: NullableIntFieldUpdateOperationsInput | number | null
    q31?: NullableIntFieldUpdateOperationsInput | number | null
    q32?: NullableIntFieldUpdateOperationsInput | number | null
    q33?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observerSubmission?: ObserverSubmissionUncheckedUpdateOneWithoutQuestionResponseNestedInput
    dspSubmission?: DspSubmissionUncheckedUpdateOneWithoutQuestionResponseNestedInput
  }

  export type QuestionResponseCreateManyInput = {
    id?: string
    q1?: number | null
    q2?: number | null
    q3?: number | null
    q4?: number | null
    q5?: number | null
    q6?: number | null
    q7?: number | null
    q8?: number | null
    q9?: number | null
    q10?: number | null
    q11?: number | null
    q12?: number | null
    q13?: number | null
    q14?: number | null
    q15?: number | null
    q16?: number | null
    q17?: number | null
    q18?: number | null
    q19?: number | null
    q20?: number | null
    q21?: number | null
    q22?: number | null
    q23?: number | null
    q24?: number | null
    q25?: number | null
    q26?: number | null
    q27?: number | null
    q28?: number | null
    q29?: number | null
    q30?: number | null
    q31?: number | null
    q32?: number | null
    q33?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionResponseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    q1?: NullableIntFieldUpdateOperationsInput | number | null
    q2?: NullableIntFieldUpdateOperationsInput | number | null
    q3?: NullableIntFieldUpdateOperationsInput | number | null
    q4?: NullableIntFieldUpdateOperationsInput | number | null
    q5?: NullableIntFieldUpdateOperationsInput | number | null
    q6?: NullableIntFieldUpdateOperationsInput | number | null
    q7?: NullableIntFieldUpdateOperationsInput | number | null
    q8?: NullableIntFieldUpdateOperationsInput | number | null
    q9?: NullableIntFieldUpdateOperationsInput | number | null
    q10?: NullableIntFieldUpdateOperationsInput | number | null
    q11?: NullableIntFieldUpdateOperationsInput | number | null
    q12?: NullableIntFieldUpdateOperationsInput | number | null
    q13?: NullableIntFieldUpdateOperationsInput | number | null
    q14?: NullableIntFieldUpdateOperationsInput | number | null
    q15?: NullableIntFieldUpdateOperationsInput | number | null
    q16?: NullableIntFieldUpdateOperationsInput | number | null
    q17?: NullableIntFieldUpdateOperationsInput | number | null
    q18?: NullableIntFieldUpdateOperationsInput | number | null
    q19?: NullableIntFieldUpdateOperationsInput | number | null
    q20?: NullableIntFieldUpdateOperationsInput | number | null
    q21?: NullableIntFieldUpdateOperationsInput | number | null
    q22?: NullableIntFieldUpdateOperationsInput | number | null
    q23?: NullableIntFieldUpdateOperationsInput | number | null
    q24?: NullableIntFieldUpdateOperationsInput | number | null
    q25?: NullableIntFieldUpdateOperationsInput | number | null
    q26?: NullableIntFieldUpdateOperationsInput | number | null
    q27?: NullableIntFieldUpdateOperationsInput | number | null
    q28?: NullableIntFieldUpdateOperationsInput | number | null
    q29?: NullableIntFieldUpdateOperationsInput | number | null
    q30?: NullableIntFieldUpdateOperationsInput | number | null
    q31?: NullableIntFieldUpdateOperationsInput | number | null
    q32?: NullableIntFieldUpdateOperationsInput | number | null
    q33?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionResponseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    q1?: NullableIntFieldUpdateOperationsInput | number | null
    q2?: NullableIntFieldUpdateOperationsInput | number | null
    q3?: NullableIntFieldUpdateOperationsInput | number | null
    q4?: NullableIntFieldUpdateOperationsInput | number | null
    q5?: NullableIntFieldUpdateOperationsInput | number | null
    q6?: NullableIntFieldUpdateOperationsInput | number | null
    q7?: NullableIntFieldUpdateOperationsInput | number | null
    q8?: NullableIntFieldUpdateOperationsInput | number | null
    q9?: NullableIntFieldUpdateOperationsInput | number | null
    q10?: NullableIntFieldUpdateOperationsInput | number | null
    q11?: NullableIntFieldUpdateOperationsInput | number | null
    q12?: NullableIntFieldUpdateOperationsInput | number | null
    q13?: NullableIntFieldUpdateOperationsInput | number | null
    q14?: NullableIntFieldUpdateOperationsInput | number | null
    q15?: NullableIntFieldUpdateOperationsInput | number | null
    q16?: NullableIntFieldUpdateOperationsInput | number | null
    q17?: NullableIntFieldUpdateOperationsInput | number | null
    q18?: NullableIntFieldUpdateOperationsInput | number | null
    q19?: NullableIntFieldUpdateOperationsInput | number | null
    q20?: NullableIntFieldUpdateOperationsInput | number | null
    q21?: NullableIntFieldUpdateOperationsInput | number | null
    q22?: NullableIntFieldUpdateOperationsInput | number | null
    q23?: NullableIntFieldUpdateOperationsInput | number | null
    q24?: NullableIntFieldUpdateOperationsInput | number | null
    q25?: NullableIntFieldUpdateOperationsInput | number | null
    q26?: NullableIntFieldUpdateOperationsInput | number | null
    q27?: NullableIntFieldUpdateOperationsInput | number | null
    q28?: NullableIntFieldUpdateOperationsInput | number | null
    q29?: NullableIntFieldUpdateOperationsInput | number | null
    q30?: NullableIntFieldUpdateOperationsInput | number | null
    q31?: NullableIntFieldUpdateOperationsInput | number | null
    q32?: NullableIntFieldUpdateOperationsInput | number | null
    q33?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverCreateInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    submissions?: ObserverSubmissionCreateNestedManyWithoutObserverInput
  }

  export type ObserverUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    submissions?: ObserverSubmissionUncheckedCreateNestedManyWithoutObserverInput
  }

  export type ObserverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: ObserverSubmissionUpdateManyWithoutObserverNestedInput
  }

  export type ObserverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: ObserverSubmissionUncheckedUpdateManyWithoutObserverNestedInput
  }

  export type ObserverCreateManyInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
  }

  export type ObserverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverSubmissionCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    observer: ObserverCreateNestedOneWithoutSubmissionsInput
    dsp: DspCreateNestedOneWithoutObserverSubmissionsInput
    questionResponse: QuestionResponseCreateNestedOneWithoutObserverSubmissionInput
  }

  export type ObserverSubmissionUncheckedCreateInput = {
    id?: string
    observerId: string
    dspId: string
    questionResponseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObserverSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observer?: ObserverUpdateOneRequiredWithoutSubmissionsNestedInput
    dsp?: DspUpdateOneRequiredWithoutObserverSubmissionsNestedInput
    questionResponse?: QuestionResponseUpdateOneRequiredWithoutObserverSubmissionNestedInput
  }

  export type ObserverSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    observerId?: StringFieldUpdateOperationsInput | string
    dspId?: StringFieldUpdateOperationsInput | string
    questionResponseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverSubmissionCreateManyInput = {
    id?: string
    observerId: string
    dspId: string
    questionResponseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObserverSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    observerId?: StringFieldUpdateOperationsInput | string
    dspId?: StringFieldUpdateOperationsInput | string
    questionResponseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DspCreateInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    observerSubmissions?: ObserverSubmissionCreateNestedManyWithoutDspInput
    selfSubmission?: DspSubmissionCreateNestedOneWithoutDspInput
  }

  export type DspUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    observerSubmissions?: ObserverSubmissionUncheckedCreateNestedManyWithoutDspInput
    selfSubmission?: DspSubmissionUncheckedCreateNestedOneWithoutDspInput
  }

  export type DspUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observerSubmissions?: ObserverSubmissionUpdateManyWithoutDspNestedInput
    selfSubmission?: DspSubmissionUpdateOneWithoutDspNestedInput
  }

  export type DspUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observerSubmissions?: ObserverSubmissionUncheckedUpdateManyWithoutDspNestedInput
    selfSubmission?: DspSubmissionUncheckedUpdateOneWithoutDspNestedInput
  }

  export type DspCreateManyInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
  }

  export type DspUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DspUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DspSubmissionCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dsp: DspCreateNestedOneWithoutSelfSubmissionInput
    questionResponse: QuestionResponseCreateNestedOneWithoutDspSubmissionInput
  }

  export type DspSubmissionUncheckedCreateInput = {
    id?: string
    dspId: string
    questionResponseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DspSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsp?: DspUpdateOneRequiredWithoutSelfSubmissionNestedInput
    questionResponse?: QuestionResponseUpdateOneRequiredWithoutDspSubmissionNestedInput
  }

  export type DspSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dspId?: StringFieldUpdateOperationsInput | string
    questionResponseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DspSubmissionCreateManyInput = {
    id?: string
    dspId: string
    questionResponseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DspSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DspSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dspId?: StringFieldUpdateOperationsInput | string
    questionResponseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ObserverSubmissionNullableScalarRelationFilter = {
    is?: ObserverSubmissionWhereInput | null
    isNot?: ObserverSubmissionWhereInput | null
  }

  export type DspSubmissionNullableScalarRelationFilter = {
    is?: DspSubmissionWhereInput | null
    isNot?: DspSubmissionWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type QuestionResponseCountOrderByAggregateInput = {
    id?: SortOrder
    q1?: SortOrder
    q2?: SortOrder
    q3?: SortOrder
    q4?: SortOrder
    q5?: SortOrder
    q6?: SortOrder
    q7?: SortOrder
    q8?: SortOrder
    q9?: SortOrder
    q10?: SortOrder
    q11?: SortOrder
    q12?: SortOrder
    q13?: SortOrder
    q14?: SortOrder
    q15?: SortOrder
    q16?: SortOrder
    q17?: SortOrder
    q18?: SortOrder
    q19?: SortOrder
    q20?: SortOrder
    q21?: SortOrder
    q22?: SortOrder
    q23?: SortOrder
    q24?: SortOrder
    q25?: SortOrder
    q26?: SortOrder
    q27?: SortOrder
    q28?: SortOrder
    q29?: SortOrder
    q30?: SortOrder
    q31?: SortOrder
    q32?: SortOrder
    q33?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionResponseAvgOrderByAggregateInput = {
    q1?: SortOrder
    q2?: SortOrder
    q3?: SortOrder
    q4?: SortOrder
    q5?: SortOrder
    q6?: SortOrder
    q7?: SortOrder
    q8?: SortOrder
    q9?: SortOrder
    q10?: SortOrder
    q11?: SortOrder
    q12?: SortOrder
    q13?: SortOrder
    q14?: SortOrder
    q15?: SortOrder
    q16?: SortOrder
    q17?: SortOrder
    q18?: SortOrder
    q19?: SortOrder
    q20?: SortOrder
    q21?: SortOrder
    q22?: SortOrder
    q23?: SortOrder
    q24?: SortOrder
    q25?: SortOrder
    q26?: SortOrder
    q27?: SortOrder
    q28?: SortOrder
    q29?: SortOrder
    q30?: SortOrder
    q31?: SortOrder
    q32?: SortOrder
    q33?: SortOrder
  }

  export type QuestionResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    q1?: SortOrder
    q2?: SortOrder
    q3?: SortOrder
    q4?: SortOrder
    q5?: SortOrder
    q6?: SortOrder
    q7?: SortOrder
    q8?: SortOrder
    q9?: SortOrder
    q10?: SortOrder
    q11?: SortOrder
    q12?: SortOrder
    q13?: SortOrder
    q14?: SortOrder
    q15?: SortOrder
    q16?: SortOrder
    q17?: SortOrder
    q18?: SortOrder
    q19?: SortOrder
    q20?: SortOrder
    q21?: SortOrder
    q22?: SortOrder
    q23?: SortOrder
    q24?: SortOrder
    q25?: SortOrder
    q26?: SortOrder
    q27?: SortOrder
    q28?: SortOrder
    q29?: SortOrder
    q30?: SortOrder
    q31?: SortOrder
    q32?: SortOrder
    q33?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionResponseMinOrderByAggregateInput = {
    id?: SortOrder
    q1?: SortOrder
    q2?: SortOrder
    q3?: SortOrder
    q4?: SortOrder
    q5?: SortOrder
    q6?: SortOrder
    q7?: SortOrder
    q8?: SortOrder
    q9?: SortOrder
    q10?: SortOrder
    q11?: SortOrder
    q12?: SortOrder
    q13?: SortOrder
    q14?: SortOrder
    q15?: SortOrder
    q16?: SortOrder
    q17?: SortOrder
    q18?: SortOrder
    q19?: SortOrder
    q20?: SortOrder
    q21?: SortOrder
    q22?: SortOrder
    q23?: SortOrder
    q24?: SortOrder
    q25?: SortOrder
    q26?: SortOrder
    q27?: SortOrder
    q28?: SortOrder
    q29?: SortOrder
    q30?: SortOrder
    q31?: SortOrder
    q32?: SortOrder
    q33?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionResponseSumOrderByAggregateInput = {
    q1?: SortOrder
    q2?: SortOrder
    q3?: SortOrder
    q4?: SortOrder
    q5?: SortOrder
    q6?: SortOrder
    q7?: SortOrder
    q8?: SortOrder
    q9?: SortOrder
    q10?: SortOrder
    q11?: SortOrder
    q12?: SortOrder
    q13?: SortOrder
    q14?: SortOrder
    q15?: SortOrder
    q16?: SortOrder
    q17?: SortOrder
    q18?: SortOrder
    q19?: SortOrder
    q20?: SortOrder
    q21?: SortOrder
    q22?: SortOrder
    q23?: SortOrder
    q24?: SortOrder
    q25?: SortOrder
    q26?: SortOrder
    q27?: SortOrder
    q28?: SortOrder
    q29?: SortOrder
    q30?: SortOrder
    q31?: SortOrder
    q32?: SortOrder
    q33?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ObserverSubmissionListRelationFilter = {
    every?: ObserverSubmissionWhereInput
    some?: ObserverSubmissionWhereInput
    none?: ObserverSubmissionWhereInput
  }

  export type ObserverSubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ObserverCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ObserverMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ObserverMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ObserverScalarRelationFilter = {
    is?: ObserverWhereInput
    isNot?: ObserverWhereInput
  }

  export type DspScalarRelationFilter = {
    is?: DspWhereInput
    isNot?: DspWhereInput
  }

  export type QuestionResponseScalarRelationFilter = {
    is?: QuestionResponseWhereInput
    isNot?: QuestionResponseWhereInput
  }

  export type ObserverSubmissionObserverIdDspIdCompoundUniqueInput = {
    observerId: string
    dspId: string
  }

  export type ObserverSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    observerId?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ObserverSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    observerId?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ObserverSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    observerId?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DspCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DspMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DspMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DspSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DspSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DspSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    dspId?: SortOrder
    questionResponseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ObserverSubmissionCreateNestedOneWithoutQuestionResponseInput = {
    create?: XOR<ObserverSubmissionCreateWithoutQuestionResponseInput, ObserverSubmissionUncheckedCreateWithoutQuestionResponseInput>
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutQuestionResponseInput
    connect?: ObserverSubmissionWhereUniqueInput
  }

  export type DspSubmissionCreateNestedOneWithoutQuestionResponseInput = {
    create?: XOR<DspSubmissionCreateWithoutQuestionResponseInput, DspSubmissionUncheckedCreateWithoutQuestionResponseInput>
    connectOrCreate?: DspSubmissionCreateOrConnectWithoutQuestionResponseInput
    connect?: DspSubmissionWhereUniqueInput
  }

  export type ObserverSubmissionUncheckedCreateNestedOneWithoutQuestionResponseInput = {
    create?: XOR<ObserverSubmissionCreateWithoutQuestionResponseInput, ObserverSubmissionUncheckedCreateWithoutQuestionResponseInput>
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutQuestionResponseInput
    connect?: ObserverSubmissionWhereUniqueInput
  }

  export type DspSubmissionUncheckedCreateNestedOneWithoutQuestionResponseInput = {
    create?: XOR<DspSubmissionCreateWithoutQuestionResponseInput, DspSubmissionUncheckedCreateWithoutQuestionResponseInput>
    connectOrCreate?: DspSubmissionCreateOrConnectWithoutQuestionResponseInput
    connect?: DspSubmissionWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ObserverSubmissionUpdateOneWithoutQuestionResponseNestedInput = {
    create?: XOR<ObserverSubmissionCreateWithoutQuestionResponseInput, ObserverSubmissionUncheckedCreateWithoutQuestionResponseInput>
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutQuestionResponseInput
    upsert?: ObserverSubmissionUpsertWithoutQuestionResponseInput
    disconnect?: ObserverSubmissionWhereInput | boolean
    delete?: ObserverSubmissionWhereInput | boolean
    connect?: ObserverSubmissionWhereUniqueInput
    update?: XOR<XOR<ObserverSubmissionUpdateToOneWithWhereWithoutQuestionResponseInput, ObserverSubmissionUpdateWithoutQuestionResponseInput>, ObserverSubmissionUncheckedUpdateWithoutQuestionResponseInput>
  }

  export type DspSubmissionUpdateOneWithoutQuestionResponseNestedInput = {
    create?: XOR<DspSubmissionCreateWithoutQuestionResponseInput, DspSubmissionUncheckedCreateWithoutQuestionResponseInput>
    connectOrCreate?: DspSubmissionCreateOrConnectWithoutQuestionResponseInput
    upsert?: DspSubmissionUpsertWithoutQuestionResponseInput
    disconnect?: DspSubmissionWhereInput | boolean
    delete?: DspSubmissionWhereInput | boolean
    connect?: DspSubmissionWhereUniqueInput
    update?: XOR<XOR<DspSubmissionUpdateToOneWithWhereWithoutQuestionResponseInput, DspSubmissionUpdateWithoutQuestionResponseInput>, DspSubmissionUncheckedUpdateWithoutQuestionResponseInput>
  }

  export type ObserverSubmissionUncheckedUpdateOneWithoutQuestionResponseNestedInput = {
    create?: XOR<ObserverSubmissionCreateWithoutQuestionResponseInput, ObserverSubmissionUncheckedCreateWithoutQuestionResponseInput>
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutQuestionResponseInput
    upsert?: ObserverSubmissionUpsertWithoutQuestionResponseInput
    disconnect?: ObserverSubmissionWhereInput | boolean
    delete?: ObserverSubmissionWhereInput | boolean
    connect?: ObserverSubmissionWhereUniqueInput
    update?: XOR<XOR<ObserverSubmissionUpdateToOneWithWhereWithoutQuestionResponseInput, ObserverSubmissionUpdateWithoutQuestionResponseInput>, ObserverSubmissionUncheckedUpdateWithoutQuestionResponseInput>
  }

  export type DspSubmissionUncheckedUpdateOneWithoutQuestionResponseNestedInput = {
    create?: XOR<DspSubmissionCreateWithoutQuestionResponseInput, DspSubmissionUncheckedCreateWithoutQuestionResponseInput>
    connectOrCreate?: DspSubmissionCreateOrConnectWithoutQuestionResponseInput
    upsert?: DspSubmissionUpsertWithoutQuestionResponseInput
    disconnect?: DspSubmissionWhereInput | boolean
    delete?: DspSubmissionWhereInput | boolean
    connect?: DspSubmissionWhereUniqueInput
    update?: XOR<XOR<DspSubmissionUpdateToOneWithWhereWithoutQuestionResponseInput, DspSubmissionUpdateWithoutQuestionResponseInput>, DspSubmissionUncheckedUpdateWithoutQuestionResponseInput>
  }

  export type ObserverSubmissionCreateNestedManyWithoutObserverInput = {
    create?: XOR<ObserverSubmissionCreateWithoutObserverInput, ObserverSubmissionUncheckedCreateWithoutObserverInput> | ObserverSubmissionCreateWithoutObserverInput[] | ObserverSubmissionUncheckedCreateWithoutObserverInput[]
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutObserverInput | ObserverSubmissionCreateOrConnectWithoutObserverInput[]
    createMany?: ObserverSubmissionCreateManyObserverInputEnvelope
    connect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
  }

  export type ObserverSubmissionUncheckedCreateNestedManyWithoutObserverInput = {
    create?: XOR<ObserverSubmissionCreateWithoutObserverInput, ObserverSubmissionUncheckedCreateWithoutObserverInput> | ObserverSubmissionCreateWithoutObserverInput[] | ObserverSubmissionUncheckedCreateWithoutObserverInput[]
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutObserverInput | ObserverSubmissionCreateOrConnectWithoutObserverInput[]
    createMany?: ObserverSubmissionCreateManyObserverInputEnvelope
    connect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
  }

  export type ObserverSubmissionUpdateManyWithoutObserverNestedInput = {
    create?: XOR<ObserverSubmissionCreateWithoutObserverInput, ObserverSubmissionUncheckedCreateWithoutObserverInput> | ObserverSubmissionCreateWithoutObserverInput[] | ObserverSubmissionUncheckedCreateWithoutObserverInput[]
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutObserverInput | ObserverSubmissionCreateOrConnectWithoutObserverInput[]
    upsert?: ObserverSubmissionUpsertWithWhereUniqueWithoutObserverInput | ObserverSubmissionUpsertWithWhereUniqueWithoutObserverInput[]
    createMany?: ObserverSubmissionCreateManyObserverInputEnvelope
    set?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    disconnect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    delete?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    connect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    update?: ObserverSubmissionUpdateWithWhereUniqueWithoutObserverInput | ObserverSubmissionUpdateWithWhereUniqueWithoutObserverInput[]
    updateMany?: ObserverSubmissionUpdateManyWithWhereWithoutObserverInput | ObserverSubmissionUpdateManyWithWhereWithoutObserverInput[]
    deleteMany?: ObserverSubmissionScalarWhereInput | ObserverSubmissionScalarWhereInput[]
  }

  export type ObserverSubmissionUncheckedUpdateManyWithoutObserverNestedInput = {
    create?: XOR<ObserverSubmissionCreateWithoutObserverInput, ObserverSubmissionUncheckedCreateWithoutObserverInput> | ObserverSubmissionCreateWithoutObserverInput[] | ObserverSubmissionUncheckedCreateWithoutObserverInput[]
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutObserverInput | ObserverSubmissionCreateOrConnectWithoutObserverInput[]
    upsert?: ObserverSubmissionUpsertWithWhereUniqueWithoutObserverInput | ObserverSubmissionUpsertWithWhereUniqueWithoutObserverInput[]
    createMany?: ObserverSubmissionCreateManyObserverInputEnvelope
    set?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    disconnect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    delete?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    connect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    update?: ObserverSubmissionUpdateWithWhereUniqueWithoutObserverInput | ObserverSubmissionUpdateWithWhereUniqueWithoutObserverInput[]
    updateMany?: ObserverSubmissionUpdateManyWithWhereWithoutObserverInput | ObserverSubmissionUpdateManyWithWhereWithoutObserverInput[]
    deleteMany?: ObserverSubmissionScalarWhereInput | ObserverSubmissionScalarWhereInput[]
  }

  export type ObserverCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<ObserverCreateWithoutSubmissionsInput, ObserverUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ObserverCreateOrConnectWithoutSubmissionsInput
    connect?: ObserverWhereUniqueInput
  }

  export type DspCreateNestedOneWithoutObserverSubmissionsInput = {
    create?: XOR<DspCreateWithoutObserverSubmissionsInput, DspUncheckedCreateWithoutObserverSubmissionsInput>
    connectOrCreate?: DspCreateOrConnectWithoutObserverSubmissionsInput
    connect?: DspWhereUniqueInput
  }

  export type QuestionResponseCreateNestedOneWithoutObserverSubmissionInput = {
    create?: XOR<QuestionResponseCreateWithoutObserverSubmissionInput, QuestionResponseUncheckedCreateWithoutObserverSubmissionInput>
    connectOrCreate?: QuestionResponseCreateOrConnectWithoutObserverSubmissionInput
    connect?: QuestionResponseWhereUniqueInput
  }

  export type ObserverUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<ObserverCreateWithoutSubmissionsInput, ObserverUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ObserverCreateOrConnectWithoutSubmissionsInput
    upsert?: ObserverUpsertWithoutSubmissionsInput
    connect?: ObserverWhereUniqueInput
    update?: XOR<XOR<ObserverUpdateToOneWithWhereWithoutSubmissionsInput, ObserverUpdateWithoutSubmissionsInput>, ObserverUncheckedUpdateWithoutSubmissionsInput>
  }

  export type DspUpdateOneRequiredWithoutObserverSubmissionsNestedInput = {
    create?: XOR<DspCreateWithoutObserverSubmissionsInput, DspUncheckedCreateWithoutObserverSubmissionsInput>
    connectOrCreate?: DspCreateOrConnectWithoutObserverSubmissionsInput
    upsert?: DspUpsertWithoutObserverSubmissionsInput
    connect?: DspWhereUniqueInput
    update?: XOR<XOR<DspUpdateToOneWithWhereWithoutObserverSubmissionsInput, DspUpdateWithoutObserverSubmissionsInput>, DspUncheckedUpdateWithoutObserverSubmissionsInput>
  }

  export type QuestionResponseUpdateOneRequiredWithoutObserverSubmissionNestedInput = {
    create?: XOR<QuestionResponseCreateWithoutObserverSubmissionInput, QuestionResponseUncheckedCreateWithoutObserverSubmissionInput>
    connectOrCreate?: QuestionResponseCreateOrConnectWithoutObserverSubmissionInput
    upsert?: QuestionResponseUpsertWithoutObserverSubmissionInput
    connect?: QuestionResponseWhereUniqueInput
    update?: XOR<XOR<QuestionResponseUpdateToOneWithWhereWithoutObserverSubmissionInput, QuestionResponseUpdateWithoutObserverSubmissionInput>, QuestionResponseUncheckedUpdateWithoutObserverSubmissionInput>
  }

  export type ObserverSubmissionCreateNestedManyWithoutDspInput = {
    create?: XOR<ObserverSubmissionCreateWithoutDspInput, ObserverSubmissionUncheckedCreateWithoutDspInput> | ObserverSubmissionCreateWithoutDspInput[] | ObserverSubmissionUncheckedCreateWithoutDspInput[]
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutDspInput | ObserverSubmissionCreateOrConnectWithoutDspInput[]
    createMany?: ObserverSubmissionCreateManyDspInputEnvelope
    connect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
  }

  export type DspSubmissionCreateNestedOneWithoutDspInput = {
    create?: XOR<DspSubmissionCreateWithoutDspInput, DspSubmissionUncheckedCreateWithoutDspInput>
    connectOrCreate?: DspSubmissionCreateOrConnectWithoutDspInput
    connect?: DspSubmissionWhereUniqueInput
  }

  export type ObserverSubmissionUncheckedCreateNestedManyWithoutDspInput = {
    create?: XOR<ObserverSubmissionCreateWithoutDspInput, ObserverSubmissionUncheckedCreateWithoutDspInput> | ObserverSubmissionCreateWithoutDspInput[] | ObserverSubmissionUncheckedCreateWithoutDspInput[]
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutDspInput | ObserverSubmissionCreateOrConnectWithoutDspInput[]
    createMany?: ObserverSubmissionCreateManyDspInputEnvelope
    connect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
  }

  export type DspSubmissionUncheckedCreateNestedOneWithoutDspInput = {
    create?: XOR<DspSubmissionCreateWithoutDspInput, DspSubmissionUncheckedCreateWithoutDspInput>
    connectOrCreate?: DspSubmissionCreateOrConnectWithoutDspInput
    connect?: DspSubmissionWhereUniqueInput
  }

  export type ObserverSubmissionUpdateManyWithoutDspNestedInput = {
    create?: XOR<ObserverSubmissionCreateWithoutDspInput, ObserverSubmissionUncheckedCreateWithoutDspInput> | ObserverSubmissionCreateWithoutDspInput[] | ObserverSubmissionUncheckedCreateWithoutDspInput[]
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutDspInput | ObserverSubmissionCreateOrConnectWithoutDspInput[]
    upsert?: ObserverSubmissionUpsertWithWhereUniqueWithoutDspInput | ObserverSubmissionUpsertWithWhereUniqueWithoutDspInput[]
    createMany?: ObserverSubmissionCreateManyDspInputEnvelope
    set?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    disconnect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    delete?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    connect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    update?: ObserverSubmissionUpdateWithWhereUniqueWithoutDspInput | ObserverSubmissionUpdateWithWhereUniqueWithoutDspInput[]
    updateMany?: ObserverSubmissionUpdateManyWithWhereWithoutDspInput | ObserverSubmissionUpdateManyWithWhereWithoutDspInput[]
    deleteMany?: ObserverSubmissionScalarWhereInput | ObserverSubmissionScalarWhereInput[]
  }

  export type DspSubmissionUpdateOneWithoutDspNestedInput = {
    create?: XOR<DspSubmissionCreateWithoutDspInput, DspSubmissionUncheckedCreateWithoutDspInput>
    connectOrCreate?: DspSubmissionCreateOrConnectWithoutDspInput
    upsert?: DspSubmissionUpsertWithoutDspInput
    disconnect?: DspSubmissionWhereInput | boolean
    delete?: DspSubmissionWhereInput | boolean
    connect?: DspSubmissionWhereUniqueInput
    update?: XOR<XOR<DspSubmissionUpdateToOneWithWhereWithoutDspInput, DspSubmissionUpdateWithoutDspInput>, DspSubmissionUncheckedUpdateWithoutDspInput>
  }

  export type ObserverSubmissionUncheckedUpdateManyWithoutDspNestedInput = {
    create?: XOR<ObserverSubmissionCreateWithoutDspInput, ObserverSubmissionUncheckedCreateWithoutDspInput> | ObserverSubmissionCreateWithoutDspInput[] | ObserverSubmissionUncheckedCreateWithoutDspInput[]
    connectOrCreate?: ObserverSubmissionCreateOrConnectWithoutDspInput | ObserverSubmissionCreateOrConnectWithoutDspInput[]
    upsert?: ObserverSubmissionUpsertWithWhereUniqueWithoutDspInput | ObserverSubmissionUpsertWithWhereUniqueWithoutDspInput[]
    createMany?: ObserverSubmissionCreateManyDspInputEnvelope
    set?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    disconnect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    delete?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    connect?: ObserverSubmissionWhereUniqueInput | ObserverSubmissionWhereUniqueInput[]
    update?: ObserverSubmissionUpdateWithWhereUniqueWithoutDspInput | ObserverSubmissionUpdateWithWhereUniqueWithoutDspInput[]
    updateMany?: ObserverSubmissionUpdateManyWithWhereWithoutDspInput | ObserverSubmissionUpdateManyWithWhereWithoutDspInput[]
    deleteMany?: ObserverSubmissionScalarWhereInput | ObserverSubmissionScalarWhereInput[]
  }

  export type DspSubmissionUncheckedUpdateOneWithoutDspNestedInput = {
    create?: XOR<DspSubmissionCreateWithoutDspInput, DspSubmissionUncheckedCreateWithoutDspInput>
    connectOrCreate?: DspSubmissionCreateOrConnectWithoutDspInput
    upsert?: DspSubmissionUpsertWithoutDspInput
    disconnect?: DspSubmissionWhereInput | boolean
    delete?: DspSubmissionWhereInput | boolean
    connect?: DspSubmissionWhereUniqueInput
    update?: XOR<XOR<DspSubmissionUpdateToOneWithWhereWithoutDspInput, DspSubmissionUpdateWithoutDspInput>, DspSubmissionUncheckedUpdateWithoutDspInput>
  }

  export type DspCreateNestedOneWithoutSelfSubmissionInput = {
    create?: XOR<DspCreateWithoutSelfSubmissionInput, DspUncheckedCreateWithoutSelfSubmissionInput>
    connectOrCreate?: DspCreateOrConnectWithoutSelfSubmissionInput
    connect?: DspWhereUniqueInput
  }

  export type QuestionResponseCreateNestedOneWithoutDspSubmissionInput = {
    create?: XOR<QuestionResponseCreateWithoutDspSubmissionInput, QuestionResponseUncheckedCreateWithoutDspSubmissionInput>
    connectOrCreate?: QuestionResponseCreateOrConnectWithoutDspSubmissionInput
    connect?: QuestionResponseWhereUniqueInput
  }

  export type DspUpdateOneRequiredWithoutSelfSubmissionNestedInput = {
    create?: XOR<DspCreateWithoutSelfSubmissionInput, DspUncheckedCreateWithoutSelfSubmissionInput>
    connectOrCreate?: DspCreateOrConnectWithoutSelfSubmissionInput
    upsert?: DspUpsertWithoutSelfSubmissionInput
    connect?: DspWhereUniqueInput
    update?: XOR<XOR<DspUpdateToOneWithWhereWithoutSelfSubmissionInput, DspUpdateWithoutSelfSubmissionInput>, DspUncheckedUpdateWithoutSelfSubmissionInput>
  }

  export type QuestionResponseUpdateOneRequiredWithoutDspSubmissionNestedInput = {
    create?: XOR<QuestionResponseCreateWithoutDspSubmissionInput, QuestionResponseUncheckedCreateWithoutDspSubmissionInput>
    connectOrCreate?: QuestionResponseCreateOrConnectWithoutDspSubmissionInput
    upsert?: QuestionResponseUpsertWithoutDspSubmissionInput
    connect?: QuestionResponseWhereUniqueInput
    update?: XOR<XOR<QuestionResponseUpdateToOneWithWhereWithoutDspSubmissionInput, QuestionResponseUpdateWithoutDspSubmissionInput>, QuestionResponseUncheckedUpdateWithoutDspSubmissionInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ObserverSubmissionCreateWithoutQuestionResponseInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    observer: ObserverCreateNestedOneWithoutSubmissionsInput
    dsp: DspCreateNestedOneWithoutObserverSubmissionsInput
  }

  export type ObserverSubmissionUncheckedCreateWithoutQuestionResponseInput = {
    id?: string
    observerId: string
    dspId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObserverSubmissionCreateOrConnectWithoutQuestionResponseInput = {
    where: ObserverSubmissionWhereUniqueInput
    create: XOR<ObserverSubmissionCreateWithoutQuestionResponseInput, ObserverSubmissionUncheckedCreateWithoutQuestionResponseInput>
  }

  export type DspSubmissionCreateWithoutQuestionResponseInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dsp: DspCreateNestedOneWithoutSelfSubmissionInput
  }

  export type DspSubmissionUncheckedCreateWithoutQuestionResponseInput = {
    id?: string
    dspId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DspSubmissionCreateOrConnectWithoutQuestionResponseInput = {
    where: DspSubmissionWhereUniqueInput
    create: XOR<DspSubmissionCreateWithoutQuestionResponseInput, DspSubmissionUncheckedCreateWithoutQuestionResponseInput>
  }

  export type ObserverSubmissionUpsertWithoutQuestionResponseInput = {
    update: XOR<ObserverSubmissionUpdateWithoutQuestionResponseInput, ObserverSubmissionUncheckedUpdateWithoutQuestionResponseInput>
    create: XOR<ObserverSubmissionCreateWithoutQuestionResponseInput, ObserverSubmissionUncheckedCreateWithoutQuestionResponseInput>
    where?: ObserverSubmissionWhereInput
  }

  export type ObserverSubmissionUpdateToOneWithWhereWithoutQuestionResponseInput = {
    where?: ObserverSubmissionWhereInput
    data: XOR<ObserverSubmissionUpdateWithoutQuestionResponseInput, ObserverSubmissionUncheckedUpdateWithoutQuestionResponseInput>
  }

  export type ObserverSubmissionUpdateWithoutQuestionResponseInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observer?: ObserverUpdateOneRequiredWithoutSubmissionsNestedInput
    dsp?: DspUpdateOneRequiredWithoutObserverSubmissionsNestedInput
  }

  export type ObserverSubmissionUncheckedUpdateWithoutQuestionResponseInput = {
    id?: StringFieldUpdateOperationsInput | string
    observerId?: StringFieldUpdateOperationsInput | string
    dspId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DspSubmissionUpsertWithoutQuestionResponseInput = {
    update: XOR<DspSubmissionUpdateWithoutQuestionResponseInput, DspSubmissionUncheckedUpdateWithoutQuestionResponseInput>
    create: XOR<DspSubmissionCreateWithoutQuestionResponseInput, DspSubmissionUncheckedCreateWithoutQuestionResponseInput>
    where?: DspSubmissionWhereInput
  }

  export type DspSubmissionUpdateToOneWithWhereWithoutQuestionResponseInput = {
    where?: DspSubmissionWhereInput
    data: XOR<DspSubmissionUpdateWithoutQuestionResponseInput, DspSubmissionUncheckedUpdateWithoutQuestionResponseInput>
  }

  export type DspSubmissionUpdateWithoutQuestionResponseInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsp?: DspUpdateOneRequiredWithoutSelfSubmissionNestedInput
  }

  export type DspSubmissionUncheckedUpdateWithoutQuestionResponseInput = {
    id?: StringFieldUpdateOperationsInput | string
    dspId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverSubmissionCreateWithoutObserverInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dsp: DspCreateNestedOneWithoutObserverSubmissionsInput
    questionResponse: QuestionResponseCreateNestedOneWithoutObserverSubmissionInput
  }

  export type ObserverSubmissionUncheckedCreateWithoutObserverInput = {
    id?: string
    dspId: string
    questionResponseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObserverSubmissionCreateOrConnectWithoutObserverInput = {
    where: ObserverSubmissionWhereUniqueInput
    create: XOR<ObserverSubmissionCreateWithoutObserverInput, ObserverSubmissionUncheckedCreateWithoutObserverInput>
  }

  export type ObserverSubmissionCreateManyObserverInputEnvelope = {
    data: ObserverSubmissionCreateManyObserverInput | ObserverSubmissionCreateManyObserverInput[]
    skipDuplicates?: boolean
  }

  export type ObserverSubmissionUpsertWithWhereUniqueWithoutObserverInput = {
    where: ObserverSubmissionWhereUniqueInput
    update: XOR<ObserverSubmissionUpdateWithoutObserverInput, ObserverSubmissionUncheckedUpdateWithoutObserverInput>
    create: XOR<ObserverSubmissionCreateWithoutObserverInput, ObserverSubmissionUncheckedCreateWithoutObserverInput>
  }

  export type ObserverSubmissionUpdateWithWhereUniqueWithoutObserverInput = {
    where: ObserverSubmissionWhereUniqueInput
    data: XOR<ObserverSubmissionUpdateWithoutObserverInput, ObserverSubmissionUncheckedUpdateWithoutObserverInput>
  }

  export type ObserverSubmissionUpdateManyWithWhereWithoutObserverInput = {
    where: ObserverSubmissionScalarWhereInput
    data: XOR<ObserverSubmissionUpdateManyMutationInput, ObserverSubmissionUncheckedUpdateManyWithoutObserverInput>
  }

  export type ObserverSubmissionScalarWhereInput = {
    AND?: ObserverSubmissionScalarWhereInput | ObserverSubmissionScalarWhereInput[]
    OR?: ObserverSubmissionScalarWhereInput[]
    NOT?: ObserverSubmissionScalarWhereInput | ObserverSubmissionScalarWhereInput[]
    id?: StringFilter<"ObserverSubmission"> | string
    observerId?: StringFilter<"ObserverSubmission"> | string
    dspId?: StringFilter<"ObserverSubmission"> | string
    questionResponseId?: StringFilter<"ObserverSubmission"> | string
    createdAt?: DateTimeFilter<"ObserverSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"ObserverSubmission"> | Date | string
  }

  export type ObserverCreateWithoutSubmissionsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
  }

  export type ObserverUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
  }

  export type ObserverCreateOrConnectWithoutSubmissionsInput = {
    where: ObserverWhereUniqueInput
    create: XOR<ObserverCreateWithoutSubmissionsInput, ObserverUncheckedCreateWithoutSubmissionsInput>
  }

  export type DspCreateWithoutObserverSubmissionsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    selfSubmission?: DspSubmissionCreateNestedOneWithoutDspInput
  }

  export type DspUncheckedCreateWithoutObserverSubmissionsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    selfSubmission?: DspSubmissionUncheckedCreateNestedOneWithoutDspInput
  }

  export type DspCreateOrConnectWithoutObserverSubmissionsInput = {
    where: DspWhereUniqueInput
    create: XOR<DspCreateWithoutObserverSubmissionsInput, DspUncheckedCreateWithoutObserverSubmissionsInput>
  }

  export type QuestionResponseCreateWithoutObserverSubmissionInput = {
    id?: string
    q1?: number | null
    q2?: number | null
    q3?: number | null
    q4?: number | null
    q5?: number | null
    q6?: number | null
    q7?: number | null
    q8?: number | null
    q9?: number | null
    q10?: number | null
    q11?: number | null
    q12?: number | null
    q13?: number | null
    q14?: number | null
    q15?: number | null
    q16?: number | null
    q17?: number | null
    q18?: number | null
    q19?: number | null
    q20?: number | null
    q21?: number | null
    q22?: number | null
    q23?: number | null
    q24?: number | null
    q25?: number | null
    q26?: number | null
    q27?: number | null
    q28?: number | null
    q29?: number | null
    q30?: number | null
    q31?: number | null
    q32?: number | null
    q33?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dspSubmission?: DspSubmissionCreateNestedOneWithoutQuestionResponseInput
  }

  export type QuestionResponseUncheckedCreateWithoutObserverSubmissionInput = {
    id?: string
    q1?: number | null
    q2?: number | null
    q3?: number | null
    q4?: number | null
    q5?: number | null
    q6?: number | null
    q7?: number | null
    q8?: number | null
    q9?: number | null
    q10?: number | null
    q11?: number | null
    q12?: number | null
    q13?: number | null
    q14?: number | null
    q15?: number | null
    q16?: number | null
    q17?: number | null
    q18?: number | null
    q19?: number | null
    q20?: number | null
    q21?: number | null
    q22?: number | null
    q23?: number | null
    q24?: number | null
    q25?: number | null
    q26?: number | null
    q27?: number | null
    q28?: number | null
    q29?: number | null
    q30?: number | null
    q31?: number | null
    q32?: number | null
    q33?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dspSubmission?: DspSubmissionUncheckedCreateNestedOneWithoutQuestionResponseInput
  }

  export type QuestionResponseCreateOrConnectWithoutObserverSubmissionInput = {
    where: QuestionResponseWhereUniqueInput
    create: XOR<QuestionResponseCreateWithoutObserverSubmissionInput, QuestionResponseUncheckedCreateWithoutObserverSubmissionInput>
  }

  export type ObserverUpsertWithoutSubmissionsInput = {
    update: XOR<ObserverUpdateWithoutSubmissionsInput, ObserverUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<ObserverCreateWithoutSubmissionsInput, ObserverUncheckedCreateWithoutSubmissionsInput>
    where?: ObserverWhereInput
  }

  export type ObserverUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: ObserverWhereInput
    data: XOR<ObserverUpdateWithoutSubmissionsInput, ObserverUncheckedUpdateWithoutSubmissionsInput>
  }

  export type ObserverUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DspUpsertWithoutObserverSubmissionsInput = {
    update: XOR<DspUpdateWithoutObserverSubmissionsInput, DspUncheckedUpdateWithoutObserverSubmissionsInput>
    create: XOR<DspCreateWithoutObserverSubmissionsInput, DspUncheckedCreateWithoutObserverSubmissionsInput>
    where?: DspWhereInput
  }

  export type DspUpdateToOneWithWhereWithoutObserverSubmissionsInput = {
    where?: DspWhereInput
    data: XOR<DspUpdateWithoutObserverSubmissionsInput, DspUncheckedUpdateWithoutObserverSubmissionsInput>
  }

  export type DspUpdateWithoutObserverSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selfSubmission?: DspSubmissionUpdateOneWithoutDspNestedInput
  }

  export type DspUncheckedUpdateWithoutObserverSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selfSubmission?: DspSubmissionUncheckedUpdateOneWithoutDspNestedInput
  }

  export type QuestionResponseUpsertWithoutObserverSubmissionInput = {
    update: XOR<QuestionResponseUpdateWithoutObserverSubmissionInput, QuestionResponseUncheckedUpdateWithoutObserverSubmissionInput>
    create: XOR<QuestionResponseCreateWithoutObserverSubmissionInput, QuestionResponseUncheckedCreateWithoutObserverSubmissionInput>
    where?: QuestionResponseWhereInput
  }

  export type QuestionResponseUpdateToOneWithWhereWithoutObserverSubmissionInput = {
    where?: QuestionResponseWhereInput
    data: XOR<QuestionResponseUpdateWithoutObserverSubmissionInput, QuestionResponseUncheckedUpdateWithoutObserverSubmissionInput>
  }

  export type QuestionResponseUpdateWithoutObserverSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    q1?: NullableIntFieldUpdateOperationsInput | number | null
    q2?: NullableIntFieldUpdateOperationsInput | number | null
    q3?: NullableIntFieldUpdateOperationsInput | number | null
    q4?: NullableIntFieldUpdateOperationsInput | number | null
    q5?: NullableIntFieldUpdateOperationsInput | number | null
    q6?: NullableIntFieldUpdateOperationsInput | number | null
    q7?: NullableIntFieldUpdateOperationsInput | number | null
    q8?: NullableIntFieldUpdateOperationsInput | number | null
    q9?: NullableIntFieldUpdateOperationsInput | number | null
    q10?: NullableIntFieldUpdateOperationsInput | number | null
    q11?: NullableIntFieldUpdateOperationsInput | number | null
    q12?: NullableIntFieldUpdateOperationsInput | number | null
    q13?: NullableIntFieldUpdateOperationsInput | number | null
    q14?: NullableIntFieldUpdateOperationsInput | number | null
    q15?: NullableIntFieldUpdateOperationsInput | number | null
    q16?: NullableIntFieldUpdateOperationsInput | number | null
    q17?: NullableIntFieldUpdateOperationsInput | number | null
    q18?: NullableIntFieldUpdateOperationsInput | number | null
    q19?: NullableIntFieldUpdateOperationsInput | number | null
    q20?: NullableIntFieldUpdateOperationsInput | number | null
    q21?: NullableIntFieldUpdateOperationsInput | number | null
    q22?: NullableIntFieldUpdateOperationsInput | number | null
    q23?: NullableIntFieldUpdateOperationsInput | number | null
    q24?: NullableIntFieldUpdateOperationsInput | number | null
    q25?: NullableIntFieldUpdateOperationsInput | number | null
    q26?: NullableIntFieldUpdateOperationsInput | number | null
    q27?: NullableIntFieldUpdateOperationsInput | number | null
    q28?: NullableIntFieldUpdateOperationsInput | number | null
    q29?: NullableIntFieldUpdateOperationsInput | number | null
    q30?: NullableIntFieldUpdateOperationsInput | number | null
    q31?: NullableIntFieldUpdateOperationsInput | number | null
    q32?: NullableIntFieldUpdateOperationsInput | number | null
    q33?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dspSubmission?: DspSubmissionUpdateOneWithoutQuestionResponseNestedInput
  }

  export type QuestionResponseUncheckedUpdateWithoutObserverSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    q1?: NullableIntFieldUpdateOperationsInput | number | null
    q2?: NullableIntFieldUpdateOperationsInput | number | null
    q3?: NullableIntFieldUpdateOperationsInput | number | null
    q4?: NullableIntFieldUpdateOperationsInput | number | null
    q5?: NullableIntFieldUpdateOperationsInput | number | null
    q6?: NullableIntFieldUpdateOperationsInput | number | null
    q7?: NullableIntFieldUpdateOperationsInput | number | null
    q8?: NullableIntFieldUpdateOperationsInput | number | null
    q9?: NullableIntFieldUpdateOperationsInput | number | null
    q10?: NullableIntFieldUpdateOperationsInput | number | null
    q11?: NullableIntFieldUpdateOperationsInput | number | null
    q12?: NullableIntFieldUpdateOperationsInput | number | null
    q13?: NullableIntFieldUpdateOperationsInput | number | null
    q14?: NullableIntFieldUpdateOperationsInput | number | null
    q15?: NullableIntFieldUpdateOperationsInput | number | null
    q16?: NullableIntFieldUpdateOperationsInput | number | null
    q17?: NullableIntFieldUpdateOperationsInput | number | null
    q18?: NullableIntFieldUpdateOperationsInput | number | null
    q19?: NullableIntFieldUpdateOperationsInput | number | null
    q20?: NullableIntFieldUpdateOperationsInput | number | null
    q21?: NullableIntFieldUpdateOperationsInput | number | null
    q22?: NullableIntFieldUpdateOperationsInput | number | null
    q23?: NullableIntFieldUpdateOperationsInput | number | null
    q24?: NullableIntFieldUpdateOperationsInput | number | null
    q25?: NullableIntFieldUpdateOperationsInput | number | null
    q26?: NullableIntFieldUpdateOperationsInput | number | null
    q27?: NullableIntFieldUpdateOperationsInput | number | null
    q28?: NullableIntFieldUpdateOperationsInput | number | null
    q29?: NullableIntFieldUpdateOperationsInput | number | null
    q30?: NullableIntFieldUpdateOperationsInput | number | null
    q31?: NullableIntFieldUpdateOperationsInput | number | null
    q32?: NullableIntFieldUpdateOperationsInput | number | null
    q33?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dspSubmission?: DspSubmissionUncheckedUpdateOneWithoutQuestionResponseNestedInput
  }

  export type ObserverSubmissionCreateWithoutDspInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    observer: ObserverCreateNestedOneWithoutSubmissionsInput
    questionResponse: QuestionResponseCreateNestedOneWithoutObserverSubmissionInput
  }

  export type ObserverSubmissionUncheckedCreateWithoutDspInput = {
    id?: string
    observerId: string
    questionResponseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObserverSubmissionCreateOrConnectWithoutDspInput = {
    where: ObserverSubmissionWhereUniqueInput
    create: XOR<ObserverSubmissionCreateWithoutDspInput, ObserverSubmissionUncheckedCreateWithoutDspInput>
  }

  export type ObserverSubmissionCreateManyDspInputEnvelope = {
    data: ObserverSubmissionCreateManyDspInput | ObserverSubmissionCreateManyDspInput[]
    skipDuplicates?: boolean
  }

  export type DspSubmissionCreateWithoutDspInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponse: QuestionResponseCreateNestedOneWithoutDspSubmissionInput
  }

  export type DspSubmissionUncheckedCreateWithoutDspInput = {
    id?: string
    questionResponseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DspSubmissionCreateOrConnectWithoutDspInput = {
    where: DspSubmissionWhereUniqueInput
    create: XOR<DspSubmissionCreateWithoutDspInput, DspSubmissionUncheckedCreateWithoutDspInput>
  }

  export type ObserverSubmissionUpsertWithWhereUniqueWithoutDspInput = {
    where: ObserverSubmissionWhereUniqueInput
    update: XOR<ObserverSubmissionUpdateWithoutDspInput, ObserverSubmissionUncheckedUpdateWithoutDspInput>
    create: XOR<ObserverSubmissionCreateWithoutDspInput, ObserverSubmissionUncheckedCreateWithoutDspInput>
  }

  export type ObserverSubmissionUpdateWithWhereUniqueWithoutDspInput = {
    where: ObserverSubmissionWhereUniqueInput
    data: XOR<ObserverSubmissionUpdateWithoutDspInput, ObserverSubmissionUncheckedUpdateWithoutDspInput>
  }

  export type ObserverSubmissionUpdateManyWithWhereWithoutDspInput = {
    where: ObserverSubmissionScalarWhereInput
    data: XOR<ObserverSubmissionUpdateManyMutationInput, ObserverSubmissionUncheckedUpdateManyWithoutDspInput>
  }

  export type DspSubmissionUpsertWithoutDspInput = {
    update: XOR<DspSubmissionUpdateWithoutDspInput, DspSubmissionUncheckedUpdateWithoutDspInput>
    create: XOR<DspSubmissionCreateWithoutDspInput, DspSubmissionUncheckedCreateWithoutDspInput>
    where?: DspSubmissionWhereInput
  }

  export type DspSubmissionUpdateToOneWithWhereWithoutDspInput = {
    where?: DspSubmissionWhereInput
    data: XOR<DspSubmissionUpdateWithoutDspInput, DspSubmissionUncheckedUpdateWithoutDspInput>
  }

  export type DspSubmissionUpdateWithoutDspInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponse?: QuestionResponseUpdateOneRequiredWithoutDspSubmissionNestedInput
  }

  export type DspSubmissionUncheckedUpdateWithoutDspInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionResponseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DspCreateWithoutSelfSubmissionInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    observerSubmissions?: ObserverSubmissionCreateNestedManyWithoutDspInput
  }

  export type DspUncheckedCreateWithoutSelfSubmissionInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    observerSubmissions?: ObserverSubmissionUncheckedCreateNestedManyWithoutDspInput
  }

  export type DspCreateOrConnectWithoutSelfSubmissionInput = {
    where: DspWhereUniqueInput
    create: XOR<DspCreateWithoutSelfSubmissionInput, DspUncheckedCreateWithoutSelfSubmissionInput>
  }

  export type QuestionResponseCreateWithoutDspSubmissionInput = {
    id?: string
    q1?: number | null
    q2?: number | null
    q3?: number | null
    q4?: number | null
    q5?: number | null
    q6?: number | null
    q7?: number | null
    q8?: number | null
    q9?: number | null
    q10?: number | null
    q11?: number | null
    q12?: number | null
    q13?: number | null
    q14?: number | null
    q15?: number | null
    q16?: number | null
    q17?: number | null
    q18?: number | null
    q19?: number | null
    q20?: number | null
    q21?: number | null
    q22?: number | null
    q23?: number | null
    q24?: number | null
    q25?: number | null
    q26?: number | null
    q27?: number | null
    q28?: number | null
    q29?: number | null
    q30?: number | null
    q31?: number | null
    q32?: number | null
    q33?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    observerSubmission?: ObserverSubmissionCreateNestedOneWithoutQuestionResponseInput
  }

  export type QuestionResponseUncheckedCreateWithoutDspSubmissionInput = {
    id?: string
    q1?: number | null
    q2?: number | null
    q3?: number | null
    q4?: number | null
    q5?: number | null
    q6?: number | null
    q7?: number | null
    q8?: number | null
    q9?: number | null
    q10?: number | null
    q11?: number | null
    q12?: number | null
    q13?: number | null
    q14?: number | null
    q15?: number | null
    q16?: number | null
    q17?: number | null
    q18?: number | null
    q19?: number | null
    q20?: number | null
    q21?: number | null
    q22?: number | null
    q23?: number | null
    q24?: number | null
    q25?: number | null
    q26?: number | null
    q27?: number | null
    q28?: number | null
    q29?: number | null
    q30?: number | null
    q31?: number | null
    q32?: number | null
    q33?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    observerSubmission?: ObserverSubmissionUncheckedCreateNestedOneWithoutQuestionResponseInput
  }

  export type QuestionResponseCreateOrConnectWithoutDspSubmissionInput = {
    where: QuestionResponseWhereUniqueInput
    create: XOR<QuestionResponseCreateWithoutDspSubmissionInput, QuestionResponseUncheckedCreateWithoutDspSubmissionInput>
  }

  export type DspUpsertWithoutSelfSubmissionInput = {
    update: XOR<DspUpdateWithoutSelfSubmissionInput, DspUncheckedUpdateWithoutSelfSubmissionInput>
    create: XOR<DspCreateWithoutSelfSubmissionInput, DspUncheckedCreateWithoutSelfSubmissionInput>
    where?: DspWhereInput
  }

  export type DspUpdateToOneWithWhereWithoutSelfSubmissionInput = {
    where?: DspWhereInput
    data: XOR<DspUpdateWithoutSelfSubmissionInput, DspUncheckedUpdateWithoutSelfSubmissionInput>
  }

  export type DspUpdateWithoutSelfSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observerSubmissions?: ObserverSubmissionUpdateManyWithoutDspNestedInput
  }

  export type DspUncheckedUpdateWithoutSelfSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observerSubmissions?: ObserverSubmissionUncheckedUpdateManyWithoutDspNestedInput
  }

  export type QuestionResponseUpsertWithoutDspSubmissionInput = {
    update: XOR<QuestionResponseUpdateWithoutDspSubmissionInput, QuestionResponseUncheckedUpdateWithoutDspSubmissionInput>
    create: XOR<QuestionResponseCreateWithoutDspSubmissionInput, QuestionResponseUncheckedCreateWithoutDspSubmissionInput>
    where?: QuestionResponseWhereInput
  }

  export type QuestionResponseUpdateToOneWithWhereWithoutDspSubmissionInput = {
    where?: QuestionResponseWhereInput
    data: XOR<QuestionResponseUpdateWithoutDspSubmissionInput, QuestionResponseUncheckedUpdateWithoutDspSubmissionInput>
  }

  export type QuestionResponseUpdateWithoutDspSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    q1?: NullableIntFieldUpdateOperationsInput | number | null
    q2?: NullableIntFieldUpdateOperationsInput | number | null
    q3?: NullableIntFieldUpdateOperationsInput | number | null
    q4?: NullableIntFieldUpdateOperationsInput | number | null
    q5?: NullableIntFieldUpdateOperationsInput | number | null
    q6?: NullableIntFieldUpdateOperationsInput | number | null
    q7?: NullableIntFieldUpdateOperationsInput | number | null
    q8?: NullableIntFieldUpdateOperationsInput | number | null
    q9?: NullableIntFieldUpdateOperationsInput | number | null
    q10?: NullableIntFieldUpdateOperationsInput | number | null
    q11?: NullableIntFieldUpdateOperationsInput | number | null
    q12?: NullableIntFieldUpdateOperationsInput | number | null
    q13?: NullableIntFieldUpdateOperationsInput | number | null
    q14?: NullableIntFieldUpdateOperationsInput | number | null
    q15?: NullableIntFieldUpdateOperationsInput | number | null
    q16?: NullableIntFieldUpdateOperationsInput | number | null
    q17?: NullableIntFieldUpdateOperationsInput | number | null
    q18?: NullableIntFieldUpdateOperationsInput | number | null
    q19?: NullableIntFieldUpdateOperationsInput | number | null
    q20?: NullableIntFieldUpdateOperationsInput | number | null
    q21?: NullableIntFieldUpdateOperationsInput | number | null
    q22?: NullableIntFieldUpdateOperationsInput | number | null
    q23?: NullableIntFieldUpdateOperationsInput | number | null
    q24?: NullableIntFieldUpdateOperationsInput | number | null
    q25?: NullableIntFieldUpdateOperationsInput | number | null
    q26?: NullableIntFieldUpdateOperationsInput | number | null
    q27?: NullableIntFieldUpdateOperationsInput | number | null
    q28?: NullableIntFieldUpdateOperationsInput | number | null
    q29?: NullableIntFieldUpdateOperationsInput | number | null
    q30?: NullableIntFieldUpdateOperationsInput | number | null
    q31?: NullableIntFieldUpdateOperationsInput | number | null
    q32?: NullableIntFieldUpdateOperationsInput | number | null
    q33?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observerSubmission?: ObserverSubmissionUpdateOneWithoutQuestionResponseNestedInput
  }

  export type QuestionResponseUncheckedUpdateWithoutDspSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    q1?: NullableIntFieldUpdateOperationsInput | number | null
    q2?: NullableIntFieldUpdateOperationsInput | number | null
    q3?: NullableIntFieldUpdateOperationsInput | number | null
    q4?: NullableIntFieldUpdateOperationsInput | number | null
    q5?: NullableIntFieldUpdateOperationsInput | number | null
    q6?: NullableIntFieldUpdateOperationsInput | number | null
    q7?: NullableIntFieldUpdateOperationsInput | number | null
    q8?: NullableIntFieldUpdateOperationsInput | number | null
    q9?: NullableIntFieldUpdateOperationsInput | number | null
    q10?: NullableIntFieldUpdateOperationsInput | number | null
    q11?: NullableIntFieldUpdateOperationsInput | number | null
    q12?: NullableIntFieldUpdateOperationsInput | number | null
    q13?: NullableIntFieldUpdateOperationsInput | number | null
    q14?: NullableIntFieldUpdateOperationsInput | number | null
    q15?: NullableIntFieldUpdateOperationsInput | number | null
    q16?: NullableIntFieldUpdateOperationsInput | number | null
    q17?: NullableIntFieldUpdateOperationsInput | number | null
    q18?: NullableIntFieldUpdateOperationsInput | number | null
    q19?: NullableIntFieldUpdateOperationsInput | number | null
    q20?: NullableIntFieldUpdateOperationsInput | number | null
    q21?: NullableIntFieldUpdateOperationsInput | number | null
    q22?: NullableIntFieldUpdateOperationsInput | number | null
    q23?: NullableIntFieldUpdateOperationsInput | number | null
    q24?: NullableIntFieldUpdateOperationsInput | number | null
    q25?: NullableIntFieldUpdateOperationsInput | number | null
    q26?: NullableIntFieldUpdateOperationsInput | number | null
    q27?: NullableIntFieldUpdateOperationsInput | number | null
    q28?: NullableIntFieldUpdateOperationsInput | number | null
    q29?: NullableIntFieldUpdateOperationsInput | number | null
    q30?: NullableIntFieldUpdateOperationsInput | number | null
    q31?: NullableIntFieldUpdateOperationsInput | number | null
    q32?: NullableIntFieldUpdateOperationsInput | number | null
    q33?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observerSubmission?: ObserverSubmissionUncheckedUpdateOneWithoutQuestionResponseNestedInput
  }

  export type ObserverSubmissionCreateManyObserverInput = {
    id?: string
    dspId: string
    questionResponseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObserverSubmissionUpdateWithoutObserverInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsp?: DspUpdateOneRequiredWithoutObserverSubmissionsNestedInput
    questionResponse?: QuestionResponseUpdateOneRequiredWithoutObserverSubmissionNestedInput
  }

  export type ObserverSubmissionUncheckedUpdateWithoutObserverInput = {
    id?: StringFieldUpdateOperationsInput | string
    dspId?: StringFieldUpdateOperationsInput | string
    questionResponseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverSubmissionUncheckedUpdateManyWithoutObserverInput = {
    id?: StringFieldUpdateOperationsInput | string
    dspId?: StringFieldUpdateOperationsInput | string
    questionResponseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverSubmissionCreateManyDspInput = {
    id?: string
    observerId: string
    questionResponseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObserverSubmissionUpdateWithoutDspInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observer?: ObserverUpdateOneRequiredWithoutSubmissionsNestedInput
    questionResponse?: QuestionResponseUpdateOneRequiredWithoutObserverSubmissionNestedInput
  }

  export type ObserverSubmissionUncheckedUpdateWithoutDspInput = {
    id?: StringFieldUpdateOperationsInput | string
    observerId?: StringFieldUpdateOperationsInput | string
    questionResponseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObserverSubmissionUncheckedUpdateManyWithoutDspInput = {
    id?: StringFieldUpdateOperationsInput | string
    observerId?: StringFieldUpdateOperationsInput | string
    questionResponseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
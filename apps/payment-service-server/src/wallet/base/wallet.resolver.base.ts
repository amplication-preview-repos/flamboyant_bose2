/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { Wallet } from "./Wallet";
import { WalletCountArgs } from "./WalletCountArgs";
import { WalletFindManyArgs } from "./WalletFindManyArgs";
import { WalletFindUniqueArgs } from "./WalletFindUniqueArgs";
import { DeleteWalletArgs } from "./DeleteWalletArgs";
import { WalletService } from "../wallet.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Wallet)
export class WalletResolverBase {
  constructor(
    protected readonly service: WalletService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Wallet",
    action: "read",
    possession: "any",
  })
  async _walletsMeta(
    @graphql.Args() args: WalletCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Wallet])
  @nestAccessControl.UseRoles({
    resource: "Wallet",
    action: "read",
    possession: "any",
  })
  async wallets(@graphql.Args() args: WalletFindManyArgs): Promise<Wallet[]> {
    return this.service.wallets(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Wallet, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Wallet",
    action: "read",
    possession: "own",
  })
  async wallet(
    @graphql.Args() args: WalletFindUniqueArgs
  ): Promise<Wallet | null> {
    const result = await this.service.wallet(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Wallet)
  @nestAccessControl.UseRoles({
    resource: "Wallet",
    action: "delete",
    possession: "any",
  })
  async deleteWallet(
    @graphql.Args() args: DeleteWalletArgs
  ): Promise<Wallet | null> {
    try {
      return await this.service.deleteWallet(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}

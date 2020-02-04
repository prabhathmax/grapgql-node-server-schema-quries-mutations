import Knex from 'knex';
import 'dotenv/config';
import {
    SecretsCache,
    DbSecrets,
} from './helpers/secretsCache';
import AccountRepository from './domain/account/repository';
import AccountService from './domain/account/service';

const createContext = async () =>{
    const secretsCache = new SecretsCache();
    const dbSecrets = new DbSecrets(secretsCache);
    const knex = Knex({
        client: 'mysql',
        connection: await dbSecrets.getAsKnex(),
        pool: { min: 0, max: 7 },
        useNullAsDefault: true,
    });
    const accountRepository = new AccountRepository(knex);
    const accountService = new AccountService(accountRepository);
    return {
        secrets:{
          db: dbSecrets
        },
        repositories: {
            account: accountRepository
        },
        services: {
            account:accountService
        }
    }
};

export default createContext;
require('dotenv').config();
import { BajaoBot } from "./bot";
import container from "./util/inversify.config";
import { TYPES } from './util/types';
let bajaoBot = container.get<BajaoBot>(TYPES.BajaoBot);
bajaoBot.listen().then(() => { console.log('Logged in') }).catch((err) => { console.log('Error', err) });
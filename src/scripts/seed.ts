import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../core/config/config.service';
import {UserService} from "../modules/user/user.service";
import {User} from "../model/user.entity";





async function run() {



    const seedId = Date.now()
        .toString()
        .split('')
        .reverse()
        .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

    const opt = {
        ...configService.getTypeOrmConfig(),
        debug: true
    };

    const connection = await createConnection(opt as ConnectionOptions);
    const userService = new UserService(connection.getRepository(User));

      const work = new User();
      work.firstname='payam';
      work.lastname='faryadras';
      work.mobile='09125726659';
      work.createdBy='system-test'
      work.internalComment='this is a test';
      work.lastChangedBy = Date.now().toLocaleString();

    return await userService.create(work);
}

run()
    .then(_ => console.log('...wait for script to exit'))
    .catch(error => console.error('seed error', error));
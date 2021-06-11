import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import specialistsRouter from '@modules/specialists/infra/http/routes/specialists.routes';
import professionsRouter from '@modules/specialists/infra/http/routes/professions.routes';
import medicalCaresRouter from '@modules/medicalCares/infra/http/routes/medicalCares.routes';
import medicalRecordsRouter from '@modules/medicalRecords/infra/http/routes/medicalRecords.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/clients', clientsRouter);
routes.use('/specialists', specialistsRouter);
routes.use('/professions', professionsRouter);
routes.use('/medical-cares', medicalCaresRouter);
routes.use('/medical-records', medicalRecordsRouter);

export default routes;

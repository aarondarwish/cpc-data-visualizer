import 'dotenv/config'

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

/* Import routers */
import { router as campaignRouter } from './routers/campaign-router.js';
import { router as searchRouter } from './routers/search-router.js';

/* create an express app and use JSON */
const app = new express()
app.use(express.json())

/* Allow CORS */
import cors from 'cors';
app.use(cors());

/* bring in some routers */
app.use('/campaign', campaignRouter);
app.use('/campaigns', searchRouter);

/* set up swagger in the root */
const swaggerDocument = YAML.load('api.yaml')
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/* start the server */
app.listen(3000)

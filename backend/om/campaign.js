import { Entity, Schema } from 'redis-om';
import client from './client.js';

class campaign extends Entity { };

/* create a Schema for campaign */
const campaignSchema = new Schema(campaign, {
    campaign_id: { type: 'number' },
    campaign_name: { type: 'string' },
    impressions: { type: 'number' },
    date_start: { type: 'string' },
    date_stop: { type: 'string' },
});

/* use the client to create a Repository just for campaigns */
export const campaignRepository = client.fetchRepository(campaignSchema);

/* create the index for campaign */
await campaignRepository.createIndex();
import { Router } from 'express';
import { campaignRepository } from '../om/campaign.js';

export const router = Router();

/* RESTful CRUD to the Redis DB */

// Create
router.put('/', async (req, res) => {
    const campaign = await campaignRepository.createAndSave(req.body);
    res.send(campaign);
})

// Read
router.get('/:id', async (req, res) => {
    const campaign = await campaignRepository.fetch(req.params.id);
    res.send(campaign);
})

// Update
router.post('/:id', async (req, res) => {

    const campaign = await campaignRepository.fetch(req.params.id);

    campaign.campaign_id = req.body.campaign_id ?? null;
    campaign.campaign_name = req.body.campaign_name ?? null;
    campaign.date_start = req.body.date_start ?? null;
    campaign.date_stop = req.body.date_stop ?? null;
    campaign.impressions = req.body.impressions ?? null;
    campaign.ongoing = req.body.ongoing ?? null;

    await campaignRepository.save(campaign);

    res.send(campaign);
});

// Delete
router.delete('/:id', async (req, res) => {
    await campaignRepository.remove(req.params.id)
    res.send({ entityId: req.params.id })
})
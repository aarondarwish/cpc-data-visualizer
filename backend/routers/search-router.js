import { Router } from 'express'
import { campaignRepository } from '../om/campaign.js'

export const router = Router()

router.get('/all', async (req, res) => {
    const campaigns = await campaignRepository.search().return.all()
    res.send(campaigns)
})

router.get('/impressions-above', async (req, res) => {
    const campaigns = await campaignRepository.search()
        .where('impressions').gte(21).return.all()
    res.send(campaigns)
})

router.get('/non-ongoing', async (req, res) => {
    const campaigns = await campaignRepository.search()
        .where('ongoing').is.not.true().return.all()
    res.send(campaigns)
})
res = {data: [{"entityId":"01G4M99MMN11QBQM08M2JW6JC5","campaign_id":6220014638597,"campaign_name":"Analytics Pulse - Shopify Demos","impressions":69110,"date_start":"2021-03-01","date_stop":"2021-04-01"},{"entityId":"01G4M99MMJWEGTFG5B77R7NHHC","campaign_id":6197267442397,"campaign_name":"EUR - 18+ - Analytics - Fredi","impressions":4486,"date_start":"2021-03-01","date_stop":"2021-04-01"},{"entityId":"01G4M99MMCCWZWHRY23N4F2WXX","campaign_id":6197267442397,"campaign_name":"EUR - 18+ - Analytics - Fredi","impressions":4473,"date_start":"2021-02-01","date_stop":"2021-03-01"},{"entityId":"01G4M99MM6YR2Q6WSFC3Z4RTDG","campaign_id":6197267442397,"campaign_name":"EUR - 18+ - Analytics - Fredi","impressions":7615,"date_start":"2021-01-01","date_stop":"2021-02-01"},{"entityId":"01G4M99MN2VA11SJ54RHY6FG2P","campaign_id":6222889988997,"campaign_name":"Analytics Pulse – Shopify Guide","impressions":29118,"date_start":"2021-04-01","date_stop":"2021-05-01"},{"entityId":"01G4M99MMVTH41PCH5F18SNAR0","campaign_id":6222889988997,"campaign_name":"Analytics Pulse – Shopify Guide","impressions":1041,"date_start":"2021-03-01","date_stop":"2021-04-01"},{"entityId":"01G4M99MMRYMS1NEM2PFT3WN3P","campaign_id":6220480360397,"campaign_name":"analytics Pulse - Shopify Survey","impressions":19288,"date_start":"2021-03-01","date_stop":"2021-04-01"},{"entityId":"01G4M99MMY7R9F7REY7P174857","campaign_id":6220014638597,"campaign_name":"Analytics Pulse - Shopify Demos","impressions":29283,"date_start":"2021-04-01","date_stop":"2021-05-01"},{"entityId":"01G4M99MMFZKF5PKDT567H10AK","campaign_id":6217419279997,"campaign_name":"Analytics Pulse - Shopify Research","impressions":51559,"date_start":"2021-02-01","date_stop":"2021-03-01"}]};

var campaignsData = [];
var campaignsNames = [];
var campaignsIDs = [];

// Sort it by date
var unsortedDates = res.data.map((campaign) => campaign.date_start.slice(6, 7));
var sortedDates = [... unsortedDates];
sortedDates.sort();
console.log(`sorted:\n${sortedDates}\nunsorted:\n${unsortedDates}`);

var siloedCampaignsData = [];
for (let j = 0; j < unsortedDates.length; j++) siloedCampaignsData.push(campaignsData[unsortedDates.indexOf(sortedDates)]);

//console.log(siloedCampaignsData);

for (let i = 0; i < res.data.length; i++) {
    campaignsData[i] = [];
    // Does this month reveal a new campaign_id? If so, register it
    if (campaignsIDs.indexOf(res.data[i].campaign_id) === -1) campaignsIDs.push(res.data[i].campaign_id);
    // If the campaign_id of a particular response index matches the id's location, then proceed to insert it
    campaignsData[campaignsIDs.indexOf(res.data[i].campaign_id)][i] = res.data[i].impressions;
    campaignsNames[campaignsIDs.indexOf(res.data[i].campaign_id)] = res.data[i].campaign_name;
}
//console.log(`Test: ${JSON.stringify(res.data)}`);
/* If at a specific month, all the other campaigns have no registered impressions data, proceed to nullify it */
//for (let i = 0; i < campaignsIDs.length; i++)
//    for (let j = 0; j < 7; j++)
//        if (campaignsData[i][j] == undefined) campaignsData[i][j] = 0;

//console.log(`Test: ${campaignsData}`);

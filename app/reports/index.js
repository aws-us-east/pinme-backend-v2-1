const s3 = require('../s3')

exports.getReport = async (report, traccar, { from, to, userData }) => {
  console.log('getReport', report, new Date(from), to, userData)
  const key = report + '_' + new Date().getTime()
  let body
  switch (report) {
    case 'zone-report':
      body = await require('fleetmap-reports/src/zone-report').createZoneReport(new Date(from), new Date(to), userData, traccar)
      break
    case 'activity-report':
      body = await require('fleetmap-reports/src/activity-report').createActivityReport(new Date(from), new Date(to), userData, traccar)
      break
    case 'kms-report':
      body = await require('fleetmap-reports/src/kms-report').createKmsReport(new Date(from), new Date(to), userData, traccar)
      break
    default:
  }
  await s3.put(key, JSON.stringify(body))
  return `${process.env.CLOUDFRONT_URL}/${key}`
}

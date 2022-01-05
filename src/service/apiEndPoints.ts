const baseURL = 'https://linkedup-app-api.azurewebsites.net/api';

const apiUri = {
    auth: {
        login: '/Auth/login',
    },
    shifts: {
        shiftsByDay: '/shifts/rosters/day/',
        // shiftsByWeek: 'shifts/rosters/week',
        getOrgID: '/Guard/orgs',
        startShift: '/shifts/start/',
        activeShift: '/shifts/active',
        endShift: '/shifts/end',
        createPetrolEntry: '/shifts/report/patrol/',
        getShiftReports: '/shifts/', // + 123/reports
        shiftReportImageUpload: '/shifts/report/upload/',
        getShiftReportFiles: '/shifts/report/', // + /12/files
        deleteShiftReportFile: '/Guard/file/', // + /fileID
        upcomingRosters: '/shifts/rosters/upcoming', // for shift tab (but for no shift)
        scanNewShiftCheckPoint: '/shifts/checkpoint',
        getScannedCheckPoints: '/shifts/', // + /123/checkpoints
        deleteScannedCheckPoint: '/shifts/checkpoint', // + /id
        deletePetrolReports: '/shifts/report', // + /shiftReportID
        statusGet: '/Guard/actions?status=', // urgent, overdue, warning etc
        shiftsByWeek: '/shifts/rosters/week/mobile/', // + /number 0 for lastWeek, 1 for thisWeek, 2 for nextWEEK
        shiftByDate : '/shifts/rosters/date', // date 'MM/DD/YYYY', g-org
        actions: '/Guard/actions?status=', // + status, g-org id in headers
        statusDetail: '/Guard/action', // + /actionID
    },
};

export { apiUri, baseURL };

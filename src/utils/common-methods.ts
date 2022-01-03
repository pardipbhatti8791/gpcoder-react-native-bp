import GetLocation from 'react-native-get-location';

export const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export const reportsData = [
    {
        name: 'Patrol',
    },
    {
        name:'Maintenance',
    },
    {
        name: 'Accident/Incident/Hazard',
    },
    {
        name: 'Welfare Check',
    },
    {
        name: 'Fire Alarm',
    },
    {
        name: 'Intoxication',
    },
    {
        name: 'Vehicle Report',
    },
    {
        name: 'Crowd Count',
    },
    {
        name: 'Bomb Threat',
    },
    {
        name: 'Boat Report',
    },
    {
        name: 'Armed Holdup',
    },





];

export const getUserLocation = () =>
    new Promise((resolve, reject) => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then((location) => {
                resolve(location);
            })
            .catch((error) => {
                const { code, message } = error;
                console.log('LOCATION ERROR ===>  ',error+"       "+message)
                return reject(error);
            });
    });


export const actionsButtonIcons = [
    {
        icon: require('@root/assets/scan/scan.png'),
        name: 'bt_accessibility',
        position: 1,
    },
];

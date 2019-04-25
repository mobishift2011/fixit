module.exports.userRoleChoices = {
    1: '客户',
    2: '服务商'
};

module.exports.userStateChoices = {
    0: '未激活',
    1: '正常'
}


module.exports.userLevelChoices = {
    'A': { exp: 0, payment: 100 },
    'B': { exp: 10, payment: 110 },
    'C': { exp: 30, payment: 120 },
    'D': { exp: 60, payment: 130 },
    'E': { exp: 100, payment: 140 },
    'F': { exp: 150, payment: 150 },
    'G': { exp: 210, payment: 160 },
    'H': { exp: 270, payment: 170 },
    'I': { exp: 350, payment: 180 },
    'J': { exp: 440, payment: 190 },
    'K': { exp: 540, payment: 200 },
    'L': { exp: 650, payment: 220 },
    'M': { exp: 770, payment: 240 },
    'N': { exp: 900, payment: 260 },
    'O': { exp: 1040, payment: 280 },
    'P': { exp: 1190, payment: 300 },
    'Q': { exp: 1350, payment: 320 },
    'R': { exp: 1520, payment: 340 },
    'S': { exp: 1700, payment: 360 },
    'T': { exp: 1890, payment: 380 },
    'U': { exp: 2090, payment: 400 },
    'V': { exp: 2300, payment: 430 },
    'W': { exp: 2520, payment: 460 },
    'X': { exp: 2750, payment: 490 },
    'Y': { exp: 2990, payment: 540 },
    'Z': { exp: 3240, payment: 580 },
}


module.exports.genderChoices = {
    0: '女',
    1: '男'
};

module.exports.orderCategoryChoices = {
    maintenance: '保养'
}

module.exports.orderStateChoices = {
    1: '派单中',
    2: '待上门',
    3: '待完成',
    4: '待确认',
    5: '已确认'
}
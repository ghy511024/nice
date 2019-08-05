
[
    {city: '北京', numer: '1231', type: 'chuzu', date: '20190702'},
    {city: '上海', numer: '231', type: 'chuzu', date: '20190703'},
    {city: '上海', numer: '6251', type: 'chushou', date: '20190702'},
    {city: '成都', numer: '341', type: 'chuzu', date: '20190704'},
    {city: '武汉', numer: '674', type: 'chuzu', date: '20190702'},
    {city: '北京', numer: '3268', type: 'chuzu', date: '20190702'},
    {city: '成都', numer: '431', type: 'chushou', date: '20190702'},
    {city: '北京', numer: '7821', type: 'chuzu', date: '20190704'},
]

/**
 * 请用您认为最优化的方式，将type 值为 chuzu 的数据过滤出来
 * 然后按相同的 local + date（按天）合并value（value累加）
 * 然后按 value 降序(从大到小)排序
 * 最后每行按照 "${city},${localData},租出${sum(numer)}套房源" 的格式输出，
 * 如："北京,2019年07月02日,租出4499套房源", 打印(console.log)出来
 *
 * */

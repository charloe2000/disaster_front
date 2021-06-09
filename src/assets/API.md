## 获取全部地震信息

```
（地震信息不包括地震id）
URL：localhost:8000/inquire/getAllEarthquakeStatistics
无参数

返回结果：
{
code:200
message:
data:[
		{
		province: 四川省， 
    	city: 成都市，
    	country: ...
    	town:...
    	village:...
    	location:
    	category:
    	date: 1999-08-07,
    	longitude:... ,
    	latitude:... ,
    	depth: ... ,
    	magnitude:... ,
    	reportingUnit:... ,
    	picture:...
		},
		{
		
		},
		...
	]
}
```



## 获取近期发生地震的位置的经纬度

```
（默认返回最近的4条数据）
URL：localhost:8000/inquire/getRecentDisasterLocation
无参数

返回结果：
成功：
{
code: 200
message: 
//data为一个对象数组
data:[
	   {
    	longitude:20.0,
    	latitude:10.0
    	},
    	{
    	longitude:20.0,
    	latitude:10.0
    	},
    	...
	]

}
```



## 获取指定省份的地震次数

```
URL：localhost:8000/getProvinceDisasterNumber
无参数

返回结果：
成功：
{
code: 200
message: 
//data为一个 灾情数据 对象数组
data:[
	   {
    	province:河北省，
    	value:8
    	},
    	{
    	province:黑龙江省,
    	value:3
    	},
    	...
	]

}

```



## 获取满足指定条件的地震信息

```
（地震信息不包括地震id）
URL：localhost:8000/inquire/getEarthquakeStatistics/参数1=...&参数2=...&参数3=...&......

可选参数：
minDate			Date格式：yyyy-MM-dd
maxDate
minLongitude	
maxLongitude
minLatitude
maxLatitude
minDepth
maxDepth
minMagnitude
maxMagnitude
location

例：
localhost:8000/inquire/getEarthquakeStatistics/minDate=2020-10-02&maxDate=2021-02-02&minLongitude=20.1

返回结果：
成功：
{
code: 200
message: 
//data为一个 灾情数据 对象数组
data:[
	   {
    	location:北京市东城区,
    	date:2020-10-09
    	longitude:...,
    	latitude
    	depth
    	magnitude
    	},
    	{
    	location:北京市海淀区,
    	date:2020-10-10
    	longitude:...
    	latitude
    	depth
    	magnitude
    	}
	]

}

失败：
{
code: 200
message: "未能查找到指定信息"
data：
```



## 获取满足指定条件的建筑物损害信息

```
URL：localhost:8000/inquire/getStructureStatistics/参数1=...&参数2=...&参数3=...

可选参数：
minDate			Date格式：yyyy-MM-dd
maxDate
location

例：
localhost:8000/inquire/getStructureStatistics/minDate=2020-10-02&maxDate=2021-02-02&location=北京市东城区

返回结果：
成功：
{
code: 200
message: 
//data为一个对象数组
data:[
	   {
    	basicallyIntactSquare:200.0,
    	damagedSquare;200.0,
    	note:xxxxx,
    	destroySquare:200.0
    	},
    	{
    	basicallyIntactSquare:200.0,
    	damagedSquare;200.0,
    	note:xxxxx,
    	destroySquare:200.0
    	}
	]

}

失败：
{
code: 200
message: "未能查找到指定信息"
data：
```



## 获取满足指定条件的二次损害的数据

```
URL: localhost:8000/inquire/getSecondStatistics/参数1=...&参数2=...&参数3=...

可选参数
minDate
maxDate
location

示例：
URL: localhost:8000/inquire/getSecondStatistics/minDate=2000-01-01&maxDate=2021-01-01&location=北京市东城区

返回结果：
成功：
{
code: 200
message: 
//data为一个 灾情数据 对象数组
data:[
	   {
    	date:2020-09-09,
    	location:北京市东城区,
    	note:xxxx
    	},
    	{
    	date:2020-09-09,
    	location:北京市东城区,
    	note:xxxx
    	},
    	...
	]

}
```



## 获取满足指定条件的人员伤亡的数据

```
URL: localhost:8000/inquire/getPeopleStatistics/参数1=...&参数2=...&参数3=...

可选参数
minDate
maxDate
location

示例：
URL: localhost:8000/inquire/getPeopleStatistics/minDate=2000-01-01&maxDate=2021-01-01&location=北京市东城区

返回结果：
成功：
{
code: 200
message: 
//data为一个 灾情数据 对象数组
data:[
	   {
    	date:2020-09-09
    	location:河北省邯郸市
    	number:8
    	},
    	{
    	date:2020-09-09
    	location:河北省邯郸市
    	number:8
    	},
    	...
	]
}
```






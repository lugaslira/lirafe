import data from '../../data/modul.json' assert { type: 'JSON' }


export function getModulParent_static()
{
    const result = data.filter((d) => {
        if(d.isParent === true){
            return d;
        }
    })

    return result
}

export function getModulByParentId_static(parentId)
{
    const result = data.filter((d) => {
        if(d.parentId === parentId){
            return d;
        }
    })

    return result
}
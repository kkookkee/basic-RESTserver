const {v4:uuidv4} = require('uuid')
const path = require('path');
const { request, response } = require('express');

const subirArchivo = (files,carpeta='',extensionesValidas = ['png','jpg','jpeg','gif']) => {
    
    return new Promise((resolve,reject)=>{
        if(!files){
            reject('No hay archivo') 
        } else {
            const {archivo} = files;
            const nombreCortado = archivo.name.split('.')
            const extension = nombreCortado[nombreCortado.length-1]
            console.log('extension ',extension);
            console.log(extensionesValidas);
            //validar extension
            if(!extensionesValidas.includes(extension)) {
                reject('Extension no valida') 
            }
            const nombreTemp = uuidv4() + '.' + extension
            let uploadPath = path.join('./controllers' + '/uploads/' , carpeta ,nombreTemp);
            archivo.mv(uploadPath, function(err) {
                if (err) {
                    reject(err)
                }
                resolve(`${nombreTemp}`) 
            });
        }

    })
        
}

module.exports = {
    subirArchivo
}
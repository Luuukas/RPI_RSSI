var A = [51, 51, 51]    // 接收机和发射机间隔1m时的信号强度
var N = [40, 40, 40]    // N=10*n，其中n为环境衰弱因子，3.25~4.5

function rssiTodis(RSSI, i) {
    let iu = (RSSI - A[i]) / N[i];
    let distance = Math.pow(10, iu);
    return distance;
}

exports.getPosi = function (data) {    // 可改成任意n维
    var mapping_datas = [
        {
            data: [90, 70],
            posi: {
                x: 1,
                y: 1
            }
        },
        {
            data: [85, 55],
            posi: {
                x: 2,
                y: 1
            }
        },
        {
            data: [92,70],
            posi: {
                x: 1,
                y: 2
            }
        },
        {
            data: [83, 70],
            posi: {
                x: 2,
                y: 2
            }
        }
    ]

    function newNode(mdid) {
        return {
            rmdid: mdid,
            lchild: {},
            rchild: {}
        }
    }

    var root;

    function insert(mapping_datas, root, mdid, layer) {
        if (((mapping_datas[root.rmdid]).data)[layer % 2] > ((mapping_datas[mdid]).data)[layer % 2]) {
            if (Object.keys(root.lchild).length == 0) {
                root.lchild = newNode(mdid);
            } else {
                insert(mapping_datas, root.lchild, mdid, layer + 1);
            }
        } else {
            if (Object.keys(root.rchild).length == 0) {
                root.rchild = newNode(mdid);
            } else {
                insert(mapping_datas, root.rchild, mdid, layer + 1);
            }
        }
    }

    function build(mapping_datas) {
        if (mapping_datas.length == 0) {
            return false;
        }
        root = newNode(0);
        for (let i = 1; i < mapping_datas.length; i++) {
            insert(mapping_datas, root, i, 0);
        }
    }

    function print(root) {
        if (Object.keys(root).length == 0) {
            return;
        }
        print(root.lchild);
        print(root.rchild);
    }

    build(mapping_datas);

    var resu = {};
    var dist = (1 << 30);

    // function EuclideanDistance(data_1, data_2) {
    //     return Math.sqrt(Math.pow(data_1[0] - data_2[0], 2) + Math.pow(data_1[1] - data_2[1], 2) + Math.pow(data_1[2] - data_2[2], 2));
    // }

    function EuclideanDistance(data_1, data_2) {
        return Math.sqrt(Math.pow(data_1[0] - data_2[0], 2) + Math.pow(data_1[1] - data_2[1], 2));
    }

    // function check(rdata, ed) {
    //     return Math.abs(rdata[0] - (mapping_datas[resu.rmdid]).data[0]) < ed
    //         || Math.abs(rdata[1] - (mapping_datas[resu.rmdid]).data[1]) < ed
    //         || Math.abs(rdata[2] - (mapping_datas[resu.rmdid]).data[2]) < ed
    // }

    function check(rdata, ed) {
        return Math.abs(rdata[0] - (mapping_datas[resu.rmdid]).data[0]) < ed
            || Math.abs(rdata[1] - (mapping_datas[resu.rmdid]).data[1]) < ed
    }

    function search(data, root, layer) {
        if (Object.keys(root).length == 0) {
            return;
        }
        if (EuclideanDistance(data, (mapping_datas[root.rmdid]).data) < dist) {
            dist = EuclideanDistance(data, (mapping_datas[root.rmdid]).data);
            resu = root;
        }
        if (((mapping_datas[root.rmdid]).data)[layer % 2] > data[layer % 2]) {
            search(data, root.lchild, layer + 1);
            if (check((mapping_datas[root.rmdid]).data, EuclideanDistance(data, (mapping_datas[resu.rmdid]).data))) {
                search(data, root.lchild, layer + 1);
            }
        } else {
            search(data, root.rchild, layer + 1);
            if (check((mapping_datas[root.rmdid]).data, EuclideanDistance(data, (mapping_datas[resu.rmdid]).data))) {
                search(data, root.rchild, layer + 1);
            }
        }
    }

    search(data, root, 0);
    return (mapping_datas[resu.rmdid]).posi;
}

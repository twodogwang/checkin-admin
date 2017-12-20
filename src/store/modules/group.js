import { getgrouplist } from '@/api/group'

const group = {
    state: {
        groupInfo: {
            pageInfo: null,
            content: null
        }
    },
    mutations: {
        GROUP_INFO: (state, result) => {
            state.groupInfo.pageInfo = result.pageInfo;
            state.groupInfo.content = result.data;
        }
    },
    actions: {
        GetGroupnInfo: ({ commit, state },params={
            pageInfo: { 
                pageSize: 10, 
                pageNum: 1
            }
        }) => {
            getgrouplist(params).then(result => {
                commit('GROUP_INFO', {
                    data: result.data.list,
                    pageInfo: {
                        pageSize: result.data.pageSize,
                        pageNum: result.data.pageNum,
                        totalItems: result.data.totalItems
                    }
                });
            })
        }
    }
}

export default group
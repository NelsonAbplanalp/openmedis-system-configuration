<template>
    <table id="om-employees-list" class="om-shadow-effect">
        <thead id="om-employees-list-header">
            <tr>
                <th v-for="column in columns" v-if="column.visible" :style="{ width: column.width}" >
                    <span>
                        {{ column.text }}
                    </span>
                </th>
            </tr>
        </thead>
        <tbody :style="{ height: tableHeight+'px' }">
            <tr v-for="(employee, index) in employeesData"
                @click="onEmployeeRowClick(employee, $event)"
                v-bind:class="{ 'second-row': index % 2 == 0 }">

                <td v-for="column in columns"
                    v-if="column.visible"
                    :style="{ width: column.width}">
                    <span v-if="column.field === 'firstName'">
                        {{ employee[column.field] + ' ' + employee['lastName'] }}
                    </span>
                    <span v-else-if="column.field === 'userId'"
                          class="glyphicon glyphicon-user"
                          :class="{disabled : employee[column.field] === 0}"
                          :style="{}" >
                    </span>
                    <span v-else>
                        {{ employee[column.field] }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'EmployeesGrid',
        data() {
            return {
                columns: columnsData,
                employeesData: testData,
                errors: []
            }
        },
        mounted: function () {
            this.$store.dispatch('setContentHeight', this.calcTableHeader() + 112)
            window.addEventListener('resize', this.setTableResize);
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.setTableResize)
        },
        computed: {
            tableHeight() {
                return this.$store.state.contentHeight
            }
        },
        methods: {
            setTableResize: function () {
                this.$store.dispatch('setContentHeight', this.calcTableHeader())
            },
            /**
             * @returns {number}
             */
            calcTableHeader: function () {
                var headerHeight      = document.getElementById('om-header').clientHeight,
                    navHeight         = document.getElementById('om-navigation').clientHeight,
                    tableHeaderHeight = document.getElementById('om-employees-list-header').clientHeight;

                return document.documentElement.clientHeight - headerHeight - navHeight - tableHeaderHeight - 20;
            },
            onEmployeeRowClick: function (employee, event) {
                this.setRowAsSelected(event)
                this.setEmployeeData(employee)
            },
            setRowAsSelected: function (event) {
                let clickedRow = this.getClickedRow(event.path),
                    selectedRowClass = 'om-selected-row'

                if (clickedRow) {
                    if (clickedRow.classList.contains('om-selected-row')) {
                        clickedRow.classList.remove(selectedRowClass)
                        this.$store.dispatch('setEmployeeEditVisibility', false)
                        document.getElementById('om-employees-list').classList.remove('om-table-small')
                    } else {
                        this.setAllOtherRowsAsNotSelected()
                        clickedRow.classList.add(selectedRowClass)
                        this.$store.dispatch('setEmployeeEditVisibility', true)
                        document.getElementById('om-employees-list').classList.add('om-table-small')
                    }
                }
            },
            setEmployeeData: function (employee) {
                this.$store.dispatch('updateEmployeeUserId', employee.userId)
                this.$store.dispatch('updateEmployeeId', employee.id)
                this.$store.dispatch('updateEmployeeLastName', employee.lastName)
                this.$store.dispatch('updateEmployeeFirstName', employee.firstName)
                this.$store.dispatch('updateEmployeePosition', employee.position)
                this.$store.dispatch('updateEmployeeEmail', employee.email)
                this.$store.dispatch('updateEmployeeMobilePhone', employee.mobilePhone)
                this.$store.dispatch('updateEmployeeWorkPhone', employee.workPhone)
                this.$store.dispatch('updateEmployeeBuilding', employee.building)
                this.$store.dispatch('updateEmployeeFloor', employee.floor)
                this.$store.dispatch('updateEmployeeRoom', employee.roomNumber)

                // set inital employee data for later compare if data changed
                this.initialEmployeeData = this.$store.state.editEmployeeData
            },
            getClickedRow: function (clickedElementPath) {
                let row = false

                clickedElementPath.forEach(function (element) {
                    if (element.tagName === 'TR') {
                        row = element
                    }
                })

                return row
            },
            setAllOtherRowsAsNotSelected: function () {
                var employeesTable = document.getElementById('om-employees-list'),
                    rows           = employeesTable.rows,
                    selectedClass  = 'om-selected-row'

                for (var i = 0, row; row = rows[i]; i++) {
                    if (row.classList.contains(selectedClass)) {
                        row.classList.remove(selectedClass)
                    }
                }
            }
        }
        // @todo: create api request to get all employees (fix backend access)
//        created() {
//            const data = new FormData();
//            data.append('username', 'admin');
//            data.append('password', 'admin');
//
//            axios.post(process.env.API_URL + '/api/authenticate', data)
//                .then(response => {
//                    axios.get(process.env.API_URL + '/api/_search/employees')
//                        .then(response => {
//                            // JSON responses are automatically parsed.
//                            this.employeesData = response.data
//                        })
//                        .catch(e => {
//                            this.errors.push(e)
//                        })
//                })
//                .catch(e => {
//                    this.errors.push(e)
//                })
//        }
    }

    const columnsData = [
        {
            text  : 'ID',
            field : 'id',
            visible: true,
            width : '6%'
        },{
            text  : 'Employee',
            field : 'firstName',  //'lastName'
            visible: true,
            width : '20%'
        },{
            text  : 'isUser',
            field : 'userId',
            visible: true,
            width : '5%'
        },{
            text  : 'Position',
            field : 'position',
            visible: true,
            width : '17%'
        },{
            text  : 'Building',
            field : 'building',
            visible: true,
            width : '18%'
        },{
            text  : 'Floor',
            field : 'floor',
            visible: true,
            width : '10%'
        },{
            text  : 'Room',
            field : 'roomNumber',
            visible: false
        },{
            text  : 'Email',
            field : 'email',
            visible: true,
            width : '24%'
        },{
            text  : 'Mobile',
            field : 'mobilePhone',
            visible: false
        },{
            text  : 'Work',
            field : 'workPhone',
            visible: false
        }
    ]

    const testData = [
        {
            "id": 12345,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 25648,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 25416,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 81556,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 54136,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 56124,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        },
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Beispiel",
            "userId": 0,
            "position": "doctor",
            "building": "Spital Beispiel",
            "floor": "1. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Sabrina",
            "lastName": "Muster",
            "userId": 1234,
            "position": "nurse",
            "building": "Spital Beispiel",
            "floor": "3. Stock",
            "email": "peter.beispiel@beispiel.com",
            "mobilePhone": "+41787776655",
            "roomNumber": "101A",
            "workPhone": "+4179876543"
        },
        {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Aranchino",
            "userId": 2345,
            "position": "IT specialist",
            "building": "Spital Beispiel",
            "floor": "2. Stock A",
            "email": "mario.aranchino@beispiel.com",
            "mobilePhone": "+41791234567",
            "roomNumber": "101A",
            "workPhone": "+41763332211"
        },
        {
            "id": 1,
            "firstName": "Alexandra",
            "lastName": "Baumberger",
            "userId": 0,
            "position": "head of department",
            "building": "Spital Beispiel",
            "floor": "4. Stock A",
            "email": "alexandra.baumberger@beispiel.com",
            "mobilePhone": "+41794226589",
            "roomNumber": "101A",
            "workPhone": "+41764789523"
        }
    ]
</script>

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function NODFiling() {

    const [user, setUser] = useState(null);
    const [userEid, setUserEid] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userFullName, setUserFullName] = useState(null);
    const [userSupervisorEid, setUserSupervisorEid] = useState(null);
    const [userSupervisorEmail, setUserSupervisorEmail] = useState(null);
    const [userSupervisorFullName, setUserSupervisorFullName] = useState(null);
    const [userOmEid, setUserOmEid] = useState(null);
    const [userOmEmail, setUserOmEmail] = useState(null);
    const [userOmFullName, setUserOmFullName] = useState(null);
    const [hrDistroEmail, setHrDistroEmail] = useState(null);
    const [isTerminable, setIsTerminable] = useState('');
    const [cleansingTime, setCleansingTime] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const htdistro = localStorage.getItem('hrdistro');
        const dta = JSON.parse(storedUser);
        console.log('User Logged In:');
        console.log(dta);
        if (storedUser) {
            setUser(dta);
            setUserEid(dta.eid);
            setUserRole(dta.role_id);
            setUserFullName(dta.empfullname);
            
            setUserSupervisorEid(dta.emp_supervisor_eid);
            setUserSupervisorEmail(dta.emp_supervisor_email);
            setUserSupervisorFullName(dta.emp_supervisor_fullname);

            setUserOmEid(dta.emp_om_eid);
            setUserOmEmail(dta.emp_om_fullname);
            setUserOmFullName(dta.empfullname);
            setHrDistroEmail(htdistro);
        }
    }, []);
    
    const [nteId, setNteId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [sanction, setSanction] = useState('');
    const [detailsOfOffense, setDetailsOfOffense] = useState('');
    const [specificViolations, setSpecificViolations] = useState('');
    const [recommendedSanction, setRecommendedSanction] = useState('');
    const [nteClass, setNteClass] = useState('');
    const [nodRemarks, setNodRemarks] = useState('');
    const [classOptions, setClassOptions] = useState([]);
    const [violationOptions, setViolationOptions] = useState([]);
    const [sanctionOptions, setSanctionOptions] = useState([]);
    const [finalSanction, setFinalSanction] = useState([]);
    const [isEditable, setIsEditable] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [nteStatusId, setNteStatusId] = useState(false);
    const [caseid, setCaseid] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    
    const handleIrCheck = () => {
        fetchIRDetails();
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/class/list`)
            .then((res) => res.json())
            .then(setClassOptions)
            .catch(console.error);

        fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/violation/list`)
            .then((res) => res.json())
            .then(setViolationOptions)
            .catch(console.error);
            
        fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/sanction/list`)
            .then(res => res.json())
            .then(data => setSanctionOptions(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        const isValid =
            nteId &&
            employeeId &&
            employeeName &&
            detailsOfOffense &&
            specificViolations &&
            recommendedSanction &&
            nteClass &&
            nodRemarks &&
            finalSanction;
        setIsFormValid(isValid);
    }, [nteId, employeeId, employeeName, detailsOfOffense, specificViolations, recommendedSanction, nteClass, nodRemarks, finalSanction]);

    const fetchIRDetails = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/nod/fetch?nte_id=${nteId}&usereid=${userEid}&rid=${userRole}`);
            const data = await res.json();

            if (res.ok) {
                setCaseid(data.id || '');
                setEmployeeId(data.emp_id || '');
                setEmployeeName(data.emp_name || '');
                setDetailsOfOffense(data.ir_why || '');
                setNteClass(data.nte_class_id || '');
                setRecommendedSanction(data.nte_violation_id || '');
                setSpecificViolations(data.nte_specific_violations || '');
                setNodRemarks(data.nod_remarks || '');
                setNteStatusId(data.nte_status_id || '');
                setSanction(data.sanction || '');
                setIsEditable(data.nte_status_id !== 1);
                setIsTerminable(data.is_terminable || '');

                if(data.nod_status_id !== null){                    
                    router.push(`/nod-filing/${data.id}`);
                }
                console.log(data);
            } else {
                resetForm();
                setErrorMessage('NTE not found or the case is not under your bucket');
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching NTE:', error);
            resetForm();
        }
    };

    const resetForm = () => {
        setEmployeeId('');
        setEmployeeName('');
        setDetailsOfOffense('');
        setNteClass('');
        setRecommendedSanction('');
        setSpecificViolations('');
        setNodRemarks('');
        setIsEditable(true);
        setSanction('');
    };

    
    async function handleSubmit(actionId) {
    //const handleSubmit = async () => {
        try {

            const statusMap = {
                0: 'NOD Draft saved',
                1: 'NOD submitted for approval',
            };
            
            const confirmMsgMap = {
                0: 'Confirm saving as draft',
                1: 'Confirm submitting this NOD',
            };

            if(!confirm(confirmMsgMap[actionId])){
                return 0;
            }

            const payload = {
                nte_id: nteId,
                nod_remarks: nodRemarks,
                nod_status_id: actionId,
                nod_sanction_id: finalSanction,
                case_is_terminable: isTerminable ,
                userEid: userEid,
                nod_recommended_sanction: sanction ,
            };

            console.log(payload);

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/nod/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok) {
                //alert(nte_status_id === 0 ? 'Draft saved.' : 'NTE submitted.');
                // if (nte_status_id === 1) {
                //     setIsEditable(false);
                // }
                //if(nte_status_id !== null){
                    router.push(`/nod-filing/${caseid}`);
                //}
            } else {
                alert(result.error || 'Failed to update case.');
            }
        } catch (error) {
            console.error('Submit failed:', error);
            alert('Something went wrong.');
        }
    };

    return (
        <>
            <Head>
                <title>Create NOD</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </Head>
            <div className="min-h-screen flex bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 overflow-y-auto">
                        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div className="max-w-4xl mx-auto bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200" style={{height:'50px', 'padding-top':'2rem!important'}}>
                                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                        Create Notice of Decision (NOD)
                                    </h3>
                                </div>

                                <div className="px-4 py-5 sm:p-6" style={{'padding-top':'1rem!important'}}>
                                    {errorMessage && (
                                        <div class="alert alert-danger" role="alert">
                                          {errorMessage}
                                        </div>
                                    )}

                                    {isLoading && (
                                        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                          <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="irReference" className="block text-sm font-medium text-gray-700">
                                                NTE Reference <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="irReference"
                                                value={nteId}
                                                onChange={(e) => setNteId(e.target.value)}
                                                onBlur={handleIrCheck}
                                                className="mt-1 block w-full px-3 py-2 shadow-sm sm:text-sm rounded-md border-gray-300"
                                                // className="mt-1 block w-full px-3 py-2 shadow-sm text-sm rounded-md border border-gray-300 bg-gray-100 cursor-not-allowed"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                                            <input
                                                value={employeeId}
                                                readOnly
                                                className="mt-1 block w-full px-3 py-2 shadow-sm sm:text-sm rounded-md border-gray-300 bg-gray-100"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                                            <input
                                                value={employeeName}
                                                readOnly
                                                className="mt-1 block w-full px-3 py-2 shadow-sm sm:text-sm rounded-md border-gray-300 bg-gray-100"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                                            <select
                                                id="class"
                                                value={nteClass}
                                                onChange={(e) => setNteClass(e.target.value)}
                                                className="mt-1 block w-full sm:text-sm rounded-md border-gray-300"
                                                disabled
                                            >
                                                <option value="">Select</option>
                                                {classOptions.map((cls) => (
                                                    <option key={cls.id} value={cls.id}>{cls.class_name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="violation" className="block text-sm font-medium text-gray-700">Violation</label>
                                            <select
                                                id="violation"
                                                value={recommendedSanction}
                                                onChange={(e) => setRecommendedSanction(e.target.value)}
                                                className="mt-1 block w-full sm:text-sm rounded-md border-gray-300"
                                                disabled
                                            >
                                                <option value="">Select</option>
                                                {violationOptions.map((vio) => (
                                                    <option key={vio.id} value={vio.id}>{vio.violation_name}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">Recommended Sanction</label>
                                            <input
                                                value={sanction}
                                                readOnly
                                                className="mt-1 block w-full px-3 py-2 shadow-sm sm:text-sm rounded-md border-gray-300 bg-gray-100"
                                            />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">Specific Violations Committed</label>
                                            <textarea
                                                value={specificViolations}
                                                onChange={(e) => setSpecificViolations(e.target.value)}
                                                rows={3}
                                                className="mt-1 block w-full sm:text-sm rounded-md border-gray-300"
                                                disabled={!isEditable}
                                            />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">Why (Details of Offense)</label>
                                            <textarea
                                                value={detailsOfOffense}
                                                readOnly
                                                rows={4}
                                                className="mt-1 block w-full sm:text-sm rounded-md border-gray-300 bg-gray-100"
                                            />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">Remarks</label>
                                            <textarea
                                                value={nodRemarks}
                                                onChange={(e) => setNodRemarks(e.target.value)}
                                                rows={3}
                                                className="mt-1 block w-full sm:text-sm rounded-md border-gray-300"
                                                disabled={!isEditable}
                                            />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">Sanction</label>
                                            <select
                                                id="finalSanction"
                                                value={finalSanction}
                                                onChange={(e) => setFinalSanction(e.target.value)}
                                                className="mt-1 block w-full sm:text-sm rounded-md border-gray-300"
                                                disabled={!isEditable}
                                            >
                                                <option value="">Select Final Sanction</option>
                                                {sanctionOptions.map((sanc) => (
                                                    <option key={sanc.id} value={sanc.id}>{sanc.sanction_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        
                                        <button
                                            type="button"
                                            disabled={!isFormValid}
                                            className={`inline-flex items-center gap-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                                            isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'
                                            }`}
                                            onClick={() => {
                                            setIsSubmitted(0);
                                            handleSubmit(0);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >

                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                            <polyline points="17 21 17 13 7 13 7 21" />
                                            <polyline points="7 3 7 8 15 8" />
                                            </svg>
                                            <span>Save as Draft</span>
                                        </button>

                                        
                                        <button
                                            type="button"
                                            disabled={!isFormValid}
                                            className={`inline-flex items-center gap-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                                            isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'
                                            }`}
                                            onClick={() => {
                                            setIsSubmitted(0);
                                            handleSubmit(1);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >

                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                            <polyline points="17 21 17 13 7 13 7 21" />
                                            <polyline points="7 3 7 8 15 8" />
                                            </svg>
                                            <span>Submit</span>
                                        </button>

                                             
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
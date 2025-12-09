import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import jsPDF from 'jspdf';
import md5 from 'md5';

export default function NODFiling() {
    const router = useRouter();
    const { caseid } = router.query;

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
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [departmentHead, setDepartmentHead] = useState('');
    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorEmail, setSupervisorEmail] = useState('');
    const [supervisorEid, setSupervisorEid] = useState('');
    const [supervisor3Eid, setSupervisor3Eid] = useState('');
    
    const [supervisordesignation, setSupervisordesignation] = useState('');
    const [omName, setOmName] = useState('');
    const [omEmail, setOmEmail] = useState('');
    const [omEid, setOmEid] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hrEid, setHrEid] = useState('');
    const [hr2Eid, setHr2Eid] = useState('');

    const [attachments, setAttachments] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);


    const [sanction, setSanction] = useState('');
    const [sanctionSelected, setSanctionSelected] = useState('');
    const [detailsOfOffense, setDetailsOfOffense] = useState('');
    const [violationName, setViolationName] = useState('');
    const [specificViolations, setSpecificViolations] = useState('');
    const [recommendedSanction, setRecommendedSanction] = useState('');
    const [nodRecommendedSanction, setNodRecommendedSanction] = useState('');
    const [nteClass, setNteClass] = useState('');
    const [nodRemarks, setNodRemarks] = useState('');
    const [classOptions, setClassOptions] = useState([]);
    const [violationOptions, setViolationOptions] = useState([]);
    const [sanctionOptions, setSanctionOptions] = useState([]);
    const [finalSanction, setFinalSanction] = useState([]);
    const [isEditable, setIsEditable] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [nteRemarks, setNteRemarks] = useState(false);
    const [nteStatusId, setNteStatusId] = useState(false);

    
    const [irRefNo, setIrRefNo] = useState('');
    const [nodRefNo, setNodRefNo] = useState('');
    const [nteRefNo, setNteRefNo] = useState('');
    const [nodStatusId, setNodStatusId] = useState('');
    const [isTerminable, setIsTerminable] = useState('');
    const [cleansingTime, setCleansingTime] = useState('');
    const [nodAcknoweledged, setNodAcknoweledged] = useState('');
    const [irWhen, setIrWhen] = useState('');
    const [nteSubmittedDate, setNteSubmittedDate] = useState('');
    const [nodCreated, setNodCreated] = useState('');
    const [nohMeetingDateTime, setNohMeetingDateTime] = useState('');
    const [nohMeetingDate, setNohMeetingDate] = useState('');
    const [nohRemarks, setNohRemarks] = useState('');
    const [nteEmployeeExplanation, setNteEmployeeExplanation] = useState('');
    const [nteClassName, setNteClassName] = useState('');
    const [nodCreatedByName, setNodCreatedByName] = useState('');
    const [nodCreatedByDesignation, setNodCreatedByDesignation] = useState('');
    const [nodCreatedByEid, setNodCreatedByEid] = useState('');
    const [omDesignation, setOmDesignation] = useState('');

    const generatePdf = async () => {
        // A4 dimensions in points (72 points = 1 inch)
        const A4 = {
            WIDTH: 595.28,  // 8.27 inches
            HEIGHT: 841.89, // 11.69 inches
            MARGIN: {
                TOP: 40,
                BOTTOM: 40,
                LEFT: 20,
                RIGHT: 20
            }
        };

        const doc = new jsPDF({
            format: 'a4',
            unit: 'pt'
        });

        const startX = A4.MARGIN.LEFT;
        const boxWidth = A4.WIDTH - (A4.MARGIN.LEFT + A4.MARGIN.RIGHT);
        const lineHeight = 12;
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

        // Function to manage page overflow
        function checkAndAddNewPage(currentY, minSpace = 50) {
            if (currentY > (A4.HEIGHT - A4.MARGIN.BOTTOM - minSpace)) {
                doc.addPage();
                return A4.MARGIN.TOP;
            }
            return currentY;
        }

        const logoPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/FPSlogo.jpg`;
        
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "Anonymous";  // Important for CORS
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        };

        let currentY = 70;

        // Custom text block function
        const addTextBlock = (text, options = {}) => {
            const {
                isBold = false,
                spacing = lineHeight,
                fontSize = 10,
                align = 'left'
            } = options;

            doc.setFontSize(fontSize);
            doc.setFont("helvetica", isBold ? "bold" : "normal");

            const lines = doc.splitTextToSize(text, boxWidth);
            lines.forEach(line => {
                currentY = checkAndAddNewPage(currentY);
                if (align === 'center') {
                    const lineWidth = doc.getTextWidth(line);
                    doc.text(line, (A4.WIDTH / 2) - (lineWidth / 2), currentY);
                } else {
                    doc.text(line, startX, currentY);
                }
                currentY += spacing;
            });
        };

        const checkAndLoadSignature = async (filepath) => {
            try {
                const image = await loadImage(filepath);
                return image;
            } catch (error) {
                console.error('Signature not found or invalid:', error);
                return null;
            }
        };

        // Add header titles and description
        doc.setFontSize(8);
        doc.text(`NOD Reference No. : ${nodRefNo}`, A4.WIDTH - 170, 30);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        const titleText = "NOTICE OF DECISION";
        const titleWidth = doc.getTextWidth(titleText);
        doc.text(titleText, (A4.WIDTH - titleWidth) / 2, 80);


        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        currentY = 120;
        addTextBlock(`DATE: ${nodCreated}`, { fontSize: 8});
        addTextBlock(`TO: ${employeeName} - (${employeeId}), ${designation}`, { fontSize: 8});
        addTextBlock(`FROM: Human Resources Department`, { fontSize: 8});

        // Subject line
        addTextBlock("SUBJECT: Regarding the Notice of Explain Dated " + 
                        `${nteSubmittedDate} concerning ` +
                        `${violationName} of the Company Code of Discipline.`, { isBold: true, fontSize: 8 });
        currentY += 5;

        doc.line(startX, currentY, startX + boxWidth, currentY);
        currentY += 20;

        addTextBlock("Incident Report:", { isBold: true, fontSize: 8 });
        currentY += 5;

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");

        doc.text(`Employee ID : ${employeeId}`, startX, currentY);
        doc.text(`Employee Name : ${employeeName}`, startX + 200, currentY);
        currentY += lineHeight;
        doc.text(`Position Title : ${designation}`, startX, currentY);
        doc.text(`Department : ${departmentName}`, startX + 200, currentY);
        currentY += lineHeight;
        doc.text(`Immediate Superior : ${supervisorName}`, startX, currentY);
        doc.text(`Department Head : ${departmentHead}`, startX + 200, currentY);
        currentY += lineHeight;
        doc.text(`Date and Time of Incident Report : ${irWhen}`, startX, currentY);
        currentY += lineHeight * 2;

        addTextBlock(`It was reported to the HR Department that you were allegedly ${specificViolations}`, { fontSize: 8 });
        currentY += 20;

        addTextBlock("Statement of Facts:", { isBold: true, fontSize: 8 });
        currentY += 5;
        
        if (isTerminable) {
            addTextBlock(`The following transpired during the administrative hearing on ${nohMeetingDateTime}:`, { fontSize: 8 });
            currentY += 5;

            // doc.setFont("helvetica", "bold");
            // doc.text("Attendees:", startX, currentY);

            // doc.setFont("helvetica", "normal");
            // const remarksText = `${nohRemarks}`;
            // const remarksLines = doc.splitTextToSize(remarksText, boxWidth);
            // remarksLines.forEach(line => {
            //     currentY = checkAndAddNewPage(currentY + lineHeight);
            //     doc.text(line, startX, currentY);
            // });
            // currentY += lineHeight;
        }

        addTextBlock(`We have received your explanation, and it indicates the following:`, { fontSize: 8 });
        currentY += 5;

        addTextBlock(`${nteEmployeeExplanation}`, { fontSize: 8 });
        currentY += 5;

        if (isTerminable) {
            addTextBlock(`Facts, evidence, and your explanation during the administrative hearing held on ${nohMeetingDate}, management has reached a decision regarding the allegations against you. `, { fontSize: 8 });
            currentY += 20;
        } else {
            addTextBlock("Upon thorough assessment of facts, evidence, and your explanation, management has reached a decision regarding the allegations against you.", { fontSize: 8 });
            currentY += 20;
        }

        addTextBlock("Conclusion of the Case:", { isBold: true, fontSize: 8 });
        currentY += 5;

        if (isTerminable) {
            addTextBlock(`It has been established during the Administrative Conference that (Overall Findings goes here)`, { fontSize: 8 });
            currentY += 5;
        } else {
            addTextBlock(`It has been established that (Overall Findings goes here)`, { fontSize: 8 });
            currentY += 5;
        }
        

        const evidenceText = `The evidence presented (if any), including screenshots, shows that your actions have violated one or more provisions of the company's Code of Conduct and Ethics, specifically:
        
        Violations Committed: ${specificViolations}`;

        addTextBlock(evidenceText, { fontSize: 8 });
        currentY += 5;

        addTextBlock(`These offense/s are classified as ${nteClassName} violation/s, warranting disciplinary action up to termination.`, { fontSize: 8 });
        currentY += 20;

        addTextBlock("Decision of the Case:", { isBold: true, fontSize: 8 });
        currentY += 5;

        addTextBlock("Given the gravity of these offenses and their impact on the company, the management has decided to impose –", { fontSize: 8 });
        currentY += 5;

        addTextBlock(`- ${sanction}`, { fontSize: 8 });
        currentY += 5;

        addTextBlock(`This shall be effective on ${nodCreated}`, { fontSize: 8 });
        currentY += 5;

        if (isTerminable) {
            addTextBlock("You are hereby relieved from your duties and are requested to surrender all company issued collaterals (ID, badge access, laptop, etc.) immediately.", { fontSize: 8 });
            currentY += 10;
        }

        const lastText = `
        This Notice and all processes undertaken per terms hereof will be documented in your Personal File.
        
        Note that the company reserves its right to further pursue, either on its own or jointly with any relevant party, any and all criminal, civil and/or administrative action against you on account of the circumstances and events that have resulted in this decision.`;

        addTextBlock(lastText, { fontSize: 8 });
        currentY += 25;

        doc.addPage();
        currentY = A4.MARGIN.TOP + 50;

        addTextBlock("Respectfully,", { isBold: true, fontSize: 8 });
        currentY += 20;

        const nodCreatorSignatureFilename = nodCreatedByEid ? md5(nodCreatedByEid) + '.png' : null;
        const nodCreatorSignatureFilepath = nodCreatorSignatureFilename ? `${basePath}/signatures/${nodCreatorSignatureFilename}` : null;

        if (nodCreatorSignatureFilename) 
        {
            const nodCreatorSignature = await checkAndLoadSignature(nodCreatorSignatureFilepath);
            if (nodCreatorSignature) {
                doc.addImage(nodCreatorSignature, 'PNG', 10, currentY - 35, 100, 50);
            }
        }

        addTextBlock(`${nodCreatedByName}`, { isBold: true, fontSize: 8 });
        addTextBlock(`${nodCreatedByDesignation}`, { fontSize: 8 });
        addTextBlock(`Full Potential Solution`, { fontSize: 8 });
        currentY += 40;

        // Supervisor Signature
        const supervisorSignatureFilename = supervisorEid ? md5(supervisorEid) + '.png' : null;
        const supervisorSignatureFilepath = supervisorSignatureFilename ? `${basePath}/signatures/${supervisorSignatureFilename}` : null;

        if (supervisorSignatureFilename) 
        {
            const supervisorSignature = await checkAndLoadSignature(supervisorSignatureFilepath);
            if (supervisorSignature) {
                doc.addImage(supervisorSignature, 'PNG', 10, currentY - 35, 100, 50);
            }
        }

        addTextBlock(`${supervisorName}`, { isBold: true, fontSize: 8 });
        addTextBlock(`${supervisordesignation}`, { fontSize: 8 });
        currentY += 40;

        // OM Signature
        const omSignatureFilename = omEid ? md5(omEid) + '.png' : null;
        const omSignatureFilepath = omSignatureFilename ? `${basePath}/signatures/${omSignatureFilename}` : null;

        if (omSignatureFilename) 
        {
            const omSignature = await checkAndLoadSignature(omSignatureFilepath);
            if (omSignature) {
                doc.addImage(omSignature, 'PNG', 10, currentY - 35, 100, 50);
            }
        }

        addTextBlock(`${omName}`, { isBold: true, fontSize: 8 });
        addTextBlock(`${omDesignation}`, { fontSize: 8 });
        currentY += 40;



        // Employee Signature
        addTextBlock("Received and Acknowledgeb by:", { isBold: true,fontSize: 8 });
        currentY += 20;
        if(nodAcknoweledged == 1){
        const empSignatureFilename = employeeId ? md5(employeeId) + '.png' : null;
        const empSignatureFilepath = empSignatureFilename ? `${basePath}/signatures/${empSignatureFilename}` : null;

        if (empSignatureFilename) 
        {
            const empSignature = await checkAndLoadSignature(empSignatureFilepath);
            if (empSignature) {
                doc.addImage(empSignature, 'PNG', 130, currentY - 40, 100, 50);
            }
        }
        
        }

        addTextBlock(`Employee Name & Signature: ${employeeName}`, { fontSize: 8 });
        
        if(nodAcknoweledged == 1){
        addTextBlock("Date and Time:", { fontSize: 8 });
        }
        let logo;
        try {
            logo = await loadImage(logoPath);
        } catch (error) {
            console.error('Failed to load logo:', error);
        }

        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            if (logo) {
                doc.addImage(logo, 'JPEG', startX, 20, 100, 50);
            }
        }

        // Save the PDF
        doc.save(`NOD-${nteId}.pdf`);
    };


    
    const [approverEid, setApproverEid] = useState('');
    const [approverName, setApproverName] = useState('');

    const [reveiwedName, setReveiwedName] = useState('');
    const [approvedName, setApprovedName] = useState('');
    const [nodCreatedDate, setNodCreatedDate] = useState('');
    const [nodAkcnowledgedDate, setNodAkcnowledgedDate] = useState('');
    const [nodAkcnowledged, setNodAkcnowledged] = useState('');
    const [reporterFullName, setReporterFullName] = useState('');

     
    useEffect(() => {
        
        fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/class/list`)
            .then(res => res.json())
            .then(data => setClassOptions(data))
            .catch(console.error);

        fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/violation/list`)
            .then(res => res.json())
            .then(data => setViolationOptions(data))
            .catch(console.error);

        
        fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/sanction/list`)
            .then(res => res.json())
            .then(data => setSanctionOptions(data))
            .catch(console.error);
    }, []);

    
    useEffect(() => {
        if (!caseid || !user) return;

        const fetchIRDetails = async () => {
            setIsLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/nod/fetchbycaseid?ir_id=${caseid}`);
            const data = await res.json();
                
            console.log(data)
            if (res.ok) {        
                if(user.eid !== data.emp_id && user.eid !== data.supervisoreid && user.eid !== data.omeid && user.role_id != 4){
                    alert('Not Allowed to access this case');
                    router.push(`/all-cases`);
                }
                setNteId(data.nte_id || '');
                setEmployeeId(data.emp_id || '');
                setEmployeeName(data.emp_name || '');                
                setEmployeeEmail(data.emp_email || '');
                setDesignation(data.designation || '');
                setDepartmentHead(data.departmenthead || '');
                setSupervisorName(data.supervisor || '');
                setSupervisorEmail(data.supervisor_email || '');
                setSupervisorEid(data.supervisoreid || '');
                setSupervisor3Eid(data.emp_supervisor3 || '');

                setSupervisordesignation(data.supervisordesignation || '');
                setOmName(data.om || '');
                setOmEmail(data.om_email || '');
                setOmEid(data.omeid || '');
                setOmDesignation(data.omdesignation || '')
                setHrEid(data.hreid || '');
                setHr2Eid(data.hr2eid || '');
                setIrRefNo(data.irrefno || '');
                setDepartmentName(data.employeedepartment || '');
                setSanctionSelected(data.sanction || '');
                setDetailsOfOffense(data.ir_why || '');
                setNteClass(data.nte_class_id || '');
                setNteClassName(data.class_name || '');
                setNodRefNo(data.nodrefno || '');
                setRecommendedSanction(data.nte_violation_id || '');
                setNodRecommendedSanction(data.nod_recommended_sanction || '');
                setSpecificViolations(data.nte_specific_violations || '');
                setViolationName(data.violation_name || '');
                setNodRemarks(data.nod_remarks || '');
                setNodStatusId(data.nod_status_id || 0); 

                setIsTerminable(data.is_terminable || 0); 
                setCleansingTime(data.cleansing_time || 0); 
                setSanction(data.sanction || '');
                setFinalSanction(data.nod_sanction_id);
                
                setApproverEid(data.ir_approver_eid || '');
                setApproverName(data.approver_name || '');

                setNodAcknoweledged(data.nod_employee_acknowledged || '');

                setAttachments(data.attachments || []);
                setReveiwedName(data.reveiwed_name || '');
                setApprovedName(data.approved_name || '');
                setNodCreatedDate(formatDate(data.nod_created_date) || '');
                setReporterFullName(data.reporter_full_name || '');
                setNodAkcnowledgedDate(formatDateTimeLocal(data.nod_employee_acknowledged_date) || '');
                setNodAkcnowledged(
                    data.nod_employee_acknowledged === 1 ? 'YES' :
                    data.nod_employee_acknowledged === 2 ? 'NO' : ''
                    );

                
                setNteSubmittedDate(data.nte_submitted_date 
                    ? new Date(data.nte_submitted_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })
                    : null
                );
                setNodCreated(data.nod_created 
                    ? new Date(data.nod_created).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })
                    : null
                );
                setIrWhen(data.ir_when || '');

                setNohMeetingDateTime(
                    data.noh_meeting_datetime ? 
                    new Date(data.noh_meeting_datetime).toLocaleString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'Asia/Manila'
                    }).replace(',', '') + ' MNL'
                    : ''
                );
                setNohRemarks(data.noh_remarks || '');
                setNteEmployeeExplanation(data.nte_employee_explanation || '');

                setNohMeetingDate(
                    data.noh_meeting_datetime ? 
                    new Date(data.noh_meeting_datetime).toLocaleString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                    })
                    : ''
                );
                setNodCreatedByName(data.nod_created_by_name || '');
                setNodCreatedByDesignation(data.nod_created_by_designation || '');
                setNodCreatedByEid(data.nod_created_by || '');


                if(data.noh_status_id === 0){
                    setIsEditable(true);
                }else{
                    setIsEditable(false);
                }


                //console.log(data);
                setIsLoading(false);
                
            } else {
                console.error('Failed to fetch data:', data);
                resetForm();
            }
        };

        fetchIRDetails();
    }, [caseid, user]);  
    useEffect(() => {
        console.log('Updated nteStatusId:', nteStatusId);
    }, [nteStatusId]);

    function resetForm() {
        setEmployeeId('');
        setEmployeeName('');
        setDetailsOfOffense('');
        setNteClass('');
        setRecommendedSanction('');
        setSpecificViolations('');
        setNteRemarks('');
        setIsEditable(true);
    }

        
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

        
    function formatDateTimeLocal(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        // Pad with leading zeros
        const pad = (n) => (n < 10 ? "0" + n : n);
        return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        "T" +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes())
        );
    }

    function handleExplanation(){


        if(!confirm('Confirm submitting your explanation')){
            return 0;
        }
        setIsLoading(true);
        
        const updatePayload = {
            
            id: caseid,
            ir_id: irId,
            nte_employee_explanation: nteEmployeeExplanation
        };

        console.log(updatePayload);

        fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/nte/explanation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatePayload),
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert(result.error);
            } else {
                //setNteStatusId(actionId);  
                setIsLoading(false);
                alert("Explanation Submitted");
                //handleEmailSend();
                window.location.reload();
            }
        })
        .catch(err => {
            console.error('Error updating NTE:', err);
            alert('Failed to submit explanation.');
        });
    }

    //handlesNODAcknowledgement

    async function handlesNODAcknowledgement(actionId) {
        
        if (!confirm('Confirm not acknowledging the decision')) {
            return 0;
        }
        setIsLoading(true);
        
        const updatePayload = {
            action_id: actionId,
            nte_id: nteId
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/nod/acknowledge`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatePayload),
            });

            const result = await response.json();

            if (result.error) {
                alert(result.error);
                return;
            }

            setNodStatusId(actionId);

            if(actionId===4){
                // Email sending logic
                const emailRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/sendEmail`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: employeeEmail,  
                        subject: `Employee Acknowledged Notice of Decision ${nodRefNo}`,
                        cc: `${supervisorEmail},${omEmail},${hrDistroEmail}`,
                        bcc: '',
                        placeholders: {
                            headertext: ``,
                            titletext: `Notice of Decision Update for ${employeeName}`,
                            emailbody: `
                                <div style="margin-bottom: 20px;">
                                    <p style="color: #7f8c8d; margin: 0 0 10px 0; font-size: 14px;">
                                        ${employeeName} has <strong>acknowledged receipt</strong> of the Notice of Decision (NOD) related to IR No. <strong>${irRefNo}</strong> in the ERMS system.
                                    </p>
                                    <p style="color: #7f8c8d; margin: 0 0 20px 0; font-size: 14px;">
                                        This confirmation indicates that the employee is aware of the decision and its corresponding sanction or outcome.
                                    </p>
                                </div>

                            `
                        }
                    })
                });

                const emailResult = await emailRes.json();
                if (!emailRes.ok) {
                    console.warn('Email send failed:', emailResult.message || 'Unknown error');
                }
            }

            setIsLoading(false);

            if(actionId===4){
                alert('NOD Acknowledged');
            }
            if(actionId===5){
                alert('Decision Not Acknowledged');
            }
            window.location.reload();

        } catch (err) {
            console.error('Error updating NOD:', err);
            alert('Failed to update NOD.');
        }
    }

    async function handleNodUpload(actionId) {
        if (selectedFiles.length > 0) {
            for (const file of selectedFiles) {
              const formData = new FormData();
              formData.append('file', file);
              formData.append('case_id', caseid);
              formData.append('created_by', userEid);
              formData.append('case_type', '3');

              const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/upload`, {
                method: 'POST',
                body: formData,
              });

              const uploadResult = await uploadRes.json();

              if (!uploadRes.ok) {
                console.error(`Failed to upload ${file.name}`);
                alert(`File upload failed for ${file.name}`);
              } else {
                console.log('File uploaded:', uploadResult);
              }
            }

            setSelectedFiles([]);
        }
    }

    async function handleNodAction(actionId) {
        const statusMap = {
            0: 'NOD Draft saved',
            1: 'NOD submitted for approval',
            2: 'NOD sent for approval',
            3: 'NOD approved',
            4: 'NOD approved',
            5: 'NOD sent back for revision'
        };

        const confirmMsgMap = {
            0: 'Confirm saving as draft',
            1: 'Confirm submitting this NOD',
            2: 'Confirm setting this NOD for approval',
            3: 'Confirm approval for this NOD',
            4: 'Confirm 2nd approval for this NOD',
            5: 'Confirm sending back for revision',
        };

        if (!confirm(confirmMsgMap[actionId])) {
            return 0;
        }
        setIsLoading(true);

        const updatePayload = {
            nte_id: nteId,
            nod_remarks: nodRemarks,
            nod_status_id: actionId === 5 ? 0 : actionId,
            nod_sanction_id: finalSanction,
            case_is_terminable : isTerminable,
            case_cleansing_time : cleansingTime,
            userEid: userEid,
            nod_recommended_sanction: nodRecommendedSanction
        };
        console.log(updatePayload);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/nod/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatePayload),
            });

            const result = await response.json();

            if (result.error) {
                alert(result.error);
                return;
            }

            setNodStatusId(actionId);

            
            const emailSubjectMap = {
                0: `Draft Saved - Notice of Decision ${nodRefNo}`,
                1: `New Notice of Decision Submitted - ${nodRefNo}`,
                2: `Notice of Decision ${nodRefNo} Pending Approval`,
                3: isTerminable
                    ? `Notice of Decision ${nodRefNo} Approved - Awaiting 2nd Approval`
                    : `Notice of Decision ${nodRefNo} Approved`,
                4: `Notice of Decision ${nodRefNo} Fully Approved (2nd Level)`,
                5: `Notice of Decision ${nodRefNo}  Returned for Revisions`
            };

            const emailCCMap = {
                0: ``,
                1: `${supervisorEmail},${omEmail}`,
                2: `${supervisorEmail},${omEmail},${hrDistroEmail}`,
                3: `${supervisorEmail},${omEmail},${hrDistroEmail}`,
                4: `${supervisorEmail},${omEmail},${hrDistroEmail}`,
                5: `${supervisorEmail},${omEmail},${hrDistroEmail}`
            };

            const emailToMap = {
                0: employeeEmail,
                1: employeeEmail,
                2: employeeEmail,
                3: employeeEmail,
                4: employeeEmail,
                5: employeeEmail
            };

           const emailLineMap = {
                0: `${employeeName}'s Notice of Decision (NOD) related to IR No. ${irRefNo} has been saved as a <strong>draft</strong> in the ERMS system.`,
                1: `${employeeName}'s Notice of Decision (NOD) related to IR No. ${irRefNo} has been <strong>submitted for review</strong> in the ERMS system.`,
                2: `The Notice of Decision (NOD) for ${employeeName} related to IR No. ${irRefNo} is currently <strong>under review</strong> by the designated approver in the ERMS system.`,
                3: isTerminable
                    ? `The Notice of Decision (NOD) for ${employeeName} related to IR No. ${irRefNo} has been <strong>reviewed and approved</strong> by the first approver and will be forwarded to the <strong>second-level approver</strong> for final approval in the ERMS system.`
                    : `The Notice of Decision (NOD) for ${employeeName} related to IR No. ${irRefNo} has been <strong>reviewed and approved</strong> in the ERMS system.`,
                4: `The Notice of Decision (NOD) for ${employeeName} related to IR No. ${irRefNo} has been <strong>approved</strong> by the <strong>second-level approver</strong> in the ERMS system.`,
                5: `The Notice of Decision (NOD) for ${employeeName} related to IR No. ${irRefNo} has been <strong>returned for revisions</strong> in the ERMS system. Please review and update the document accordingly.`,

            };

            if (selectedFiles.length > 0) {
                await handleNodUpload(1);
            }

            // Email sending logic
            const emailRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/sendEmail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: emailToMap[actionId],  
                    subject: emailSubjectMap[actionId],
                    cc: emailCCMap[actionId],
                    bcc: '',
                    placeholders: {
                        headertext: ``,
                        titletext: `Notice of Decision Update for ${employeeName}`,
                        emailbody: `
                            <div style="margin-bottom: 20px;">
                                <p style="color: #7f8c8d; font-size: 14px;">
                                    ${emailLineMap[actionId]}
                                </p>
                                <p style="color: #7f8c8d; font-size: 14px;">
                                    <strong>Remarks:</strong> ${nodRemarks}<br/>
                                    <strong>Sanction:</strong> ${sanctionSelected}
                                </p>
                            </div>
                        `
                    }
                })
            });

            const emailResult = await emailRes.json();
            if (!emailRes.ok) {
                console.warn('Email send failed:', emailResult.message || 'Unknown error');
            }

            setIsLoading(false);
            alert(statusMap[actionId]);
            window.location.reload();

        } catch (err) {
            console.error('Error updating NOD:', err);
            alert('Failed to update NOD.');
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles((prev) => [...prev, ...files]);
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles((prev) => [...prev, ...files]);
    };



    return (
        <>
            <Head>
                <title>Create NOD | {employeeName}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </Head>
            <div className="min-h-screen flex bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 overflow-y-auto">
                        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div className="max-w-4xl mx-auto bg-white shadow sm:rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900">
                                    
                                    {nodStatusId === 0 ? "Notice of Decision Filing" : `Notice of Decision ${nodRefNo}`}
                                </h3>
                                
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
                                            readOnly
                                            className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-300"
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                                        <input
                                            value={employeeId}
                                            readOnly
                                            className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 bg-gray-100"
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                                        <input
                                            value={employeeName}
                                            readOnly
                                            className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 bg-gray-100"
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                                        <select
                                            id="class"
                                            value={nteClass}
                                            onChange={(e) => setNteClass(e.target.value)}
                                            className="mt-1 block w-full sm:text-sm rounded-md border-gray-300"
                                            disabled={!isEditable}
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
                                            disabled={!isEditable}
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
                                            value={nodRecommendedSanction}
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
                                            disabled={nodStatusId!==0}
                                        />
                                    </div>

                                
                                    <div className="sm:col-span-6">
                                        <label className="block text-sm font-medium text-gray-700">Sanction</label>
                                        <select
                                            id="finalSanction"
                                            value={finalSanction}
                                            onChange={(e) => setFinalSanction(e.target.value)}
                                            className="mt-1 block w-full sm:text-sm rounded-md border-gray-300"
                                            disabled={nodStatusId!==0}
                                        >
                                            <option value="">Select Final Sanction</option>
                                            {sanctionOptions.map((sanc) => (
                                                <option key={sanc.id} value={sanc.id}>{sanc.sanction_name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {(nodStatusId === 2  && userRole == 4) && (
                                      <div className="sm:col-span-6">
                                        <label className="block text-sm font-medium text-gray-700">Attachments</label>
                                        <div
                                          onDrop={handleFileDrop}
                                          onDragOver={handleDragOver}
                                          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                                        >

                                          <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2}>
                                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                              <polyline points="17 8 12 3 7 8" />
                                              <line x1="12" y1="3" x2="12" y2="15" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600 justify-center">
                                              <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                                              >
                                                <span>Upload files</span>
                                                <input
                                                  id="file-upload"
                                                  name="file-upload"
                                                  type="file"
                                                  multiple
                                                  className="sr-only"
                                                  onChange={handleFileChange}
                                                />

                                              </label>
                                              <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB each</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {selectedFiles.length > 0 && (
                                      <div className="sm:col-span-6">
                                        <div className="mt-4 border border-gray-200 rounded p-4 bg-white shadow-sm">
                                          <h4 className="text-sm font-medium text-gray-700 mb-1">Files ready to upload:</h4>
                                          <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                                            {selectedFiles.map((file, index) => (
                                              <li key={index} className="flex justify-between items-center">
                                                <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                                                <button
                                                  type="button"
                                                  onClick={() => removeFile(index)}
                                                  className="text-red-500 hover:text-red-700 text-xs ml-2"
                                                >
                                                  Remove
                                                </button>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    )}

                                    {attachments.length > 0 && (
                                      <div className="sm:col-span-6">
                                        <div className="mt-6 border border-gray-100 rounded p-4 bg-gray-50">
                                          <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                                          <ul className="list-disc ml-5 space-y-1 text-sm">
                                            {attachments.map((file, idx) => (
                                              <li key={idx}>
                                                <a
                                                  href={`${process.env.NEXT_PUBLIC_BASE_PATH}/uploads/${file.file_name}`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  download
                                                  className="text-indigo-600 hover:underline"
                                                >
                                                  {file.file_name} ({(file.file_size / 1024).toFixed(1)} KB)
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    )}

                                    
                                    {nodStatusId !== 0 && (
                                    <>
                                        <div className="sm:col-span-6"><hr></hr></div>
                                        <div className="sm:col-span-3">
                                        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                                            <p><strong>Created Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> {nodCreatedDate}</p>
                                            <p>
                                                <strong>Created by &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> 
                                                        &nbsp;{reporterFullName}
                                            </p>
                                            <p><strong>Employee Accepted NOD &nbsp;:</strong> {nodAkcnowledged}</p>
                                        </label>
                                        </div>
                                        <div className="sm:col-span-3">
                                        <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">
                                            <p><strong>Reviewed By&nbsp;:</strong> {reveiwedName}</p>
                                            <p><strong>Approved By&nbsp;:</strong> {approvedName}</p>
                                            <p><strong>Employee Action Date &nbsp;:</strong> {nodAkcnowledgedDate}</p>
                                        </label>
                                        </div>
                                        <div className="sm:col-span-6"><hr></hr></div>
                                    </>
                                    )}
                                </div>
                                
                                
                                <div className="mt-6 flex justify-end space-x-3"> 
                                    {(nteStatusId !== 0 ) && (
                                        <button
                                            onClick={generatePdf}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Print NOD
                                        </button> 
                                    )}

                                    {nodStatusId === 0 && (
                                    (userRole === 4 || userEid === supervisorEid)
                                    ) && (
                                        <button
                                            onClick={() => handleNodAction(0)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Save as Draft 
                                        </button>                                        
                                    )} 
                                    
                                    {nodStatusId === 0 && (
                                    (userRole === 4 || userEid === supervisorEid)
                                    ) && (
                                        <button
                                            onClick={() => handleNodAction(isTerminable && userRole === 4 ? 3 : 1)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            {isTerminable && userRole === 4 ? 'Approve' : 'Submit'}
                                        </button>                                     
                                    )}
                                    
                                    {(nodStatusId === 1 && (userEid === omEid || userEid === supervisor3Eid || userEid === approverEid)) && (
                                        
                                        <button
                                            onClick={() => handleNodAction(5)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Send for Revision
                                        </button>                                  
                                    )}

                                    {(nodStatusId === 1 && (userEid === omEid || userEid === supervisor3Eid || userEid === approverEid)) && ( 
                                        <button
                                            onClick={() => handleNodAction(2)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            For Approval
                                        </button>                                 
                                    )}


                                    {(nodStatusId === 2  && userRole == 4) && (
                                        
                                        <button
                                            onClick={() => handleNodUpload(1)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Upload Attachments 
                                        </button>                                  
                                    )} 
                                    
                                    {(nodStatusId === 2  && userRole == 4) && (
                                        
                                        <button
                                            onClick={() => handleNodAction(5)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Send for Revision
                                        </button>                                  
                                    )}

                                    {(nodStatusId === 2  && userRole == 4) && (
                                        
                                        <button
                                            onClick={() => handleNodAction(3)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Approve
                                        </button>                                  
                                    )}

                                    {(nodStatusId === 3  && userRole == 4 && userEid == hr2Eid && isTerminable === 1) && (
                                        
                                        <button
                                            onClick={() => handleNodAction(4)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Approve (2nd)
                                        </button>                                  
                                    )}

                                    {(((nodStatusId === 4 && isTerminable === 1 && userEid === employeeId) || (nodStatusId === 3 && isTerminable === 0 && userEid === employeeId)) && nodAcknoweledged == 0) && (
                                        
                                        <button
                                            onClick={() => handlesNODAcknowledgement(4)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Acknowledge
                                        </button>                                  
                                    )}
                                    {(((nodStatusId === 4 && isTerminable === 1 && userEid === employeeId) || (nodStatusId === 3 && isTerminable === 0 && userEid === employeeId)) && nodAcknoweledged == 0) && (
                                        
                                        <button
                                            onClick={() => handlesNODAcknowledgement(5)}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            I do not acknowledge
                                        </button>                                  
                                    )}

                                    
                                </div>

                                    
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

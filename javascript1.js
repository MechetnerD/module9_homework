"use strict";

const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`;

const parser = new DOMParser();

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

console.log(xmlDOM);

const listNode = xmlDOM.querySelector("list");
const studentNode = xmlDOM.querySelectorAll("student");
const nameNode = xmlDOM.querySelectorAll("name");
const lang = nameNode[0].getAttribute("lang");
const firstNameNode = xmlDOM.querySelectorAll("name first");
const secondNameNode = xmlDOM.querySelectorAll("name second");
const ageNode = xmlDOM.querySelectorAll("age");
const profNode = xmlDOM.querySelectorAll("prof");

console.log(studentNode[0].nodeName, studentNode[0].children, lang);

const resultingObject = {
  list: [{}, {}],
};

function transformXMLtoJSObject(xmlNode) {
  const listNode = xmlDOM.querySelector("list");
  const studentsNodes = xmlDOM.querySelectorAll("student");

  const students = [...studentsNodes].map((student) => {
    console.log(student);
    const name =
      student.children[0].children[0].textContent +
      " " +
      student.children[0].children[1].textContent;
    console.log(name);
    const age = +student.children[1].textContent;
    const prof = student.children[2].textContent;

    const lang = student.children[0].getAttribute("lang");

    return {
      name,
      age,
      prof,
      lang,
    };
  });

  console.log(students);
}



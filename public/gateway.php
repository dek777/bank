<?php
$fio = $_POST['fio'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$nationality = $_POST['nationality'];

if ($fio && $phone && $email && $nationality){
  echo 'success';
}
